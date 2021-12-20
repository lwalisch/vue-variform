<template>
    <div>
        <!-- {{formElementData}} -->
        <div class="container">
            <form-element
                :form-element-data="formElementData"
                :slot-names="slotNames"
            >

                <!-- forward all slots to the root form element -->
                <template v-for="slotName in slotNames" v-slot:[slotName]="slotProps">
                    <slot :name="slotName" :form-element-data="slotProps.formElementData"/>
                </template>

            </form-element>
            <div class="rerender">{{rerender}}</div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import FormElement from './FormElement.vue';
import {
    GroupContent, FormElementData, NestedFormElementContent, NestedConditionalContent,
    ValidationResponse, NestedConditionalRadioContent, NestedConditionalCheckboxContent,
} from './datatypes';

@Component({
    name: 'Variform',
    components: {
        FormElement,
    },
})
export default class App extends Vue {

    rerender: number = 0

    outData: object = {}

    @Prop()
    formElementData!: FormElementData

    @Prop({ default: () => ['default'] }) // use default type with value default so if slotNames is not set, the default slot is rendered
    slotNames!: Array<string>

    @Prop()
    converters!: {[key: string]: Function}

    @Prop()
    validators!: {[key: string]: Function}

    // use the information from the dataMapping field in FormElementData to create a formatted output
    // of the content captured in the application form
    async generateData(formElementData: FormElementData, isRoot = false) {
        if (isRoot) {
            this.outData = {};
        }

        // check if the element has a outData mapping, if not, the value of the element is ignored
        if ('dataMapping' in formElementData && formElementData.dataMapping) {
            let insertValue = _.get(formElementData, formElementData.dataMapping.formKeypath);

            // check if the element has a validiator attached, if so, validate the field
            if ('validation' in formElementData && formElementData.validation) {
                const validationResponse = await this.validators[formElementData.validation.validator](formElementData.content) as ValidationResponse;
                if (!validationResponse.valid) {
                    formElementData.validation.validationError = validationResponse.error;

                    // trigger formElement update by incrementing validaitonUpdate
                    // ValidationUpdate is registered as a prop in formElement
                    let validationUpdateValue = _.get(formElementData, 'validation.validationUpdate', 0);
                    _.set(formElementData, 'validation.validationUpdate', ++validationUpdateValue);

                // if the validation was successful, only trigger an validationUpdate if there was an error in the
                // last validation. Also delete the error message from last validation
                } else if (formElementData.validation.validationError) {
                    formElementData.validation.validationError = undefined;

                    // trigger formElement update by incrementing validaitonUpdate
                    // ValidationUpdate is registered as a prop in formElement
                    let validationUpdateValue = _.get(formElementData, 'validation.validationUpdate', 0);
                    _.set(formElementData, 'validation.validationUpdate', ++validationUpdateValue);
                }
            }

            // if there is a converter registered for this element, run the insertValue thorugh the converter
            if ('convertToExternalData' in formElementData.dataMapping) {
                // insertValue = this[formElementData.resultMapping.converter](insertValue);
                insertValue = await this.converters[formElementData.dataMapping.convertToExternalData](insertValue);
            }

            // only set the insertValue to the generated data if the content is not empty
            if (insertValue !== '' && insertValue !== undefined && insertValue !== null) {

                // if the external keypath has already a value, convert the value to an array and add the second value to
                // avoid overriding the first value. This is useful e.g. if elements are dynamically generated with actionAddElement
                // as in this case, all dynamically generated elements use the same key for mapping
                const extVal = _.get(this.outData, formElementData.dataMapping.externalKeypath, null);
                if (extVal === null) {
                    _.set(this.outData, formElementData.dataMapping.externalKeypath, insertValue);
                } else if (Array.isArray(extVal)) {
                    extVal.push(insertValue);
                } else {
                    _.set(this.outData, formElementData.dataMapping.externalKeypath, [extVal, insertValue]);
                }

                // workaround to trigger a rerender because vue cant detect a change of a key in this.outData
                // (google search: vue object reactivity)
                this.rerender++;
            }
        }

        // group elements contain further elements, therefore they are recursively processed to consider
        // child form elements with dataMapping fields
        if (formElementData.type === 'group') {
            const groupContent = formElementData.content as GroupContent;
            for (let i = 0; i < groupContent.items.length; ++i) {
                await this.generateData(groupContent.items[i]);
            }
        }

        if (formElementData.type === 'nested') {
            const nestedContent = formElementData.content as NestedFormElementContent;
            for (const child of nestedContent.children) {
                await this.generateData(child);
            }
        }

        // nestedConditional elements contain further elements and are processed recursively
        // only the currently active conditional children are processed
        if (formElementData.type === 'nestedConditional') {
            const nestedConditionalContent = formElementData.content as NestedConditionalContent;
            for (const conditionalChildren of nestedConditionalContent.conditions) {
                if (conditionalChildren.condition === nestedConditionalContent.dropdownContent.value) {
                    for (const child of conditionalChildren.children) {
                        await this.generateData(child);
                    }
                }
            }
        }

        // nestedConditionalRadio elements contain further elements and are processed recursively
        // only the currently active conditional children are processed
        if (formElementData.type === 'nestedConditionalRadio') {
            const nestedConditionalContent = formElementData.content as NestedConditionalRadioContent;
            for (const conditionalChildren of nestedConditionalContent.conditions) {
                if (conditionalChildren.condition === nestedConditionalContent.radioGroupContent.value) {
                    for (const child of conditionalChildren.children) {
                        await this.generateData(child);
                    }
                }
            }
        }

        // nestedConditionalCheckbox elements contain further elements and are processed recursively
        // only the currently active conditional children are processed
        if (formElementData.type === 'nestedConditionalCheckbox') {
            const nestedConditionalContent = formElementData.content as NestedConditionalCheckboxContent;
            for (const conditionalChildren of nestedConditionalContent.conditions) {
                if (conditionalChildren.condition in nestedConditionalContent.checkboxGroupContent.values
                    && nestedConditionalContent.checkboxGroupContent.values[conditionalChildren.condition] === true) {
                    for (const child of conditionalChildren.children) {
                        await this.generateData(child);
                    }
                }
            }
        }
        return this.outData;
    }

    // use the information from the dataMapping field in FormElementData to populate
    // the formElements with data from the db
    // inData is the generated data obtained from the generateData method
    // formElementData expects the INITIAL forrmElementData, not the formElement data in the state where generateData was executed
    async populateForm(formElementData: FormElementData, inData: any) {
        if ('dataMapping' in formElementData && formElementData.dataMapping) {
            let itemValue = _.get(inData, formElementData.dataMapping.externalKeypath, null);
            // TODO: remove formElementTemplate from the conversion functions
            const formElementTemplate = _.get(formElementData, formElementData.dataMapping.formKeypath, null);

            // use convertToFormdata function (content, extData) to convert the inData to a format displayable in the formElement
            if ('convertToFormData' in formElementData.dataMapping && formElementData.dataMapping.convertToFormData) {
                itemValue = await this.converters[formElementData.dataMapping.convertToFormData](formElementTemplate, itemValue);
            }
            _.set(formElementData, formElementData.dataMapping.formKeypath, itemValue);
        }

        // process all elements that contain further elements recursively
        // Be careful though with deeply nested forms as the entire inData is passed down the tree instead of only a subsection.
        // This is necessary as the inData does not have the same tree structure as the formElement Data.
        // This could lead to performance issues when populating large forms as it is not very efficient.

        // process nested children recursively
        if (formElementData.type === 'nested') {
            const content = formElementData.content as NestedFormElementContent;
            for (const [i, child] of content.children.entries()) {
                content.children[i] = await this.populateForm(child, inData);
            }
        }

        // process nested children recursively, but only if the mapping does not contain a "convertToFormData function".
        // if "convertToFormData" is present, it is assumed that this function already handles the processing of child elements
        if (formElementData.type === 'nestedConditional') {
            if (_.get(formElementData, 'dataMapping.convertToFormData', null) === null) {
                const content = formElementData.content as NestedConditionalContent;
                const activeCondition = content.dropdownContent.value;
                for (const conditionObject of content.conditions) {
                    if (conditionObject.condition === activeCondition) {
                        for (const [i, child] of conditionObject.children.entries()) {
                            conditionObject.children[i] = await this.populateForm(child, inData);
                        }
                        break;
                    }
                }
            }
        }

        if (formElementData.type === 'nestedConditionalRadio') {
            if (_.get(formElementData, 'dataMapping.convertToFormData', null) === null) {
                const content = formElementData.content as NestedConditionalRadioContent;
                const activeCondition = content.radioGroupContent.value;
                for (const conditionObject of content.conditions) {
                    if (conditionObject.condition === activeCondition) {
                        for (const [i, child] of conditionObject.children.entries()) {
                            conditionObject.children[i] = await this.populateForm(child, inData);
                        }
                        break;
                    }
                }
            }
        }

        if (formElementData.type === 'nestedConditionalCheckbox') {
            if (_.get(formElementData, 'dataMapping.convertToFormData', null) === null) {
                const content = formElementData.content as NestedConditionalCheckboxContent;
                const activeConditions = [];
                for (const key in content.checkboxGroupContent.values) {
                    if (content.checkboxGroupContent.values[key]) {
                        activeConditions.push(key);
                    }
                }
                for (const conditionObject of content.conditions) {
                    if (activeConditions.includes(conditionObject.condition)) {
                        for (const [i, child] of conditionObject.children.entries()) {
                            conditionObject.children[i] = await this.populateForm(child, inData);
                        }
                    }
                }
            }
        }

        if (formElementData.type === 'group') {

            // process group children recursively
            const groupContent = formElementData.content as GroupContent;
            for (let j = 0; j < groupContent.items.length; ++j) {
                groupContent.items[j] = await this.populateForm(groupContent.items[j], inData);
            }

            // group elements could have dynamically added elements (actionAddElement functionality)
            // if the data mapping of an "actionAddElement" resolves a value that is an array,
            // it indicates that multiple elements of the "actionAddElement" have been added to the form
            const actionAddElement = _.get(formElementData, 'content.actionAddElement', null) as FormElementData;
            if (actionAddElement !== null && 'dataMapping' in actionAddElement && actionAddElement.dataMapping) {

                // if elementVal is an array, multiple elements of this type have to be added to the form
                // for each value, a child element must be added to the group
                let elementVals = _.get(inData, actionAddElement.dataMapping.externalKeypath, null);
                if (elementVals !== null) {
                    if (!Array.isArray(elementVals)) {
                        elementVals = [elementVals];
                    }

                    const formElementTemplate = _.get(actionAddElement, actionAddElement.dataMapping.formKeypath, null);
                    for (let elementVal of elementVals) {
                        const additionalFormElement = _.cloneDeep(actionAddElement) as FormElementData;

                        // use convertToFormdata function (content, extData) to convert the inData to a format displayable in the formElement
                        if ('convertToFormData' in actionAddElement.dataMapping && actionAddElement.dataMapping.convertToFormData) {
                            elementVal = await this.converters[actionAddElement.dataMapping.convertToFormData](_.cloneDeep(formElementTemplate), elementVal);
                        }
                        _.set(additionalFormElement, actionAddElement.dataMapping.formKeypath, elementVal);
                        (formElementData.content as GroupContent).items.push(additionalFormElement);
                    }
                }
            }
        }
        return formElementData;
    }

    refresh() {
        this.rerender++;
    }

}
</script>
