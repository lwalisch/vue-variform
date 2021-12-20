<template>
    <div>
        <div :class="[formElementData.class, { row: formElementData.type != 'group'}]">
            <template v-if="formElementData.type == 'group'">

                <!-- display headline -->
                <div v-if="formElementData.content.label"
                    class="group col-12"
                    >
                    <template v-if="!('headlineSize' in formElementData.content)">
                        {{formElementData.content.label}}
                    </template>
                    <h1 v-else-if="formElementData.content.headlineSize === 'h1'">
                        {{formElementData.content.label}}
                    </h1>
                    <h2 v-else-if="formElementData.content.headlineSize === 'h2'">
                        {{formElementData.content.label}}
                    </h2>
                    <h3 v-else-if="formElementData.content.headlineSize === 'h3'">
                        {{formElementData.content.label}}
                    </h3>
                </div>

                <!-- display all items that belong to the group -->
                <div class="col-12">
                    <form-element v-for="(itemData, index) in formElementData.content.items" :key="index"
                        @delete="deleteChildElement"
                        :form-element-data="itemData"
                        :slot-names="slotNames"
                        :validation-update="'validation' in itemData ? itemData.validation.validationUpdate : 0"
                    >
                        <!-- pass custom component slots down to the form elements of the group -->
                        <template v-for="slotName in slotNames" v-slot:[slotName]="slotProps">
                            <slot :name="slotName" :form-element-data="slotProps.formElementData"/>
                        </template>

                    </form-element>
                    <div v-if="'actionAddElement' in formElementData.content">
                        <button type="success" @click="addElementToGroup(formElementData)">+</button>
                    </div>
                </div>
            </template>
            <template v-if="formElementData.type == 'input'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">
                    <input type='text' v-model="formElementData.content.value"
                        class="variform-input"
                        :placeholder="'placeholder' in formElementData.content ? formElementData.content.placeholder : formElementData.content.label"
                    />
                </div>
            </template>

            <template v-if="formElementData.type == 'inputNumber'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">
                    <button class="variform-input-number-btn-left" @click="formElementData.content.value--;"><font-awesome-icon icon="minus" size="xs"/></button>
                    <input type='number' v-model="formElementData.content.value"
                        class="variform-input-number"
                        :placeholder="'placeholder' in formElementData.content ? formElementData.content.placeholder : ''"
                    />
                    <button class="variform-input-number-btn-right" @click="formElementData.content.value++;"><font-awesome-icon icon="plus" size="xs"/></button>
                </div>
            </template>

            <template v-if="formElementData.type == 'dropdown'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">
                    <select v-model="formElementData.content.value" class="variform-dropdown">
                        <option v-if="formElementData.content.placeholder !== undefined" disabled value="">
                            {{formElementData.content.placeholder}}
                        </option>
                        <option v-for="(item, index) in formElementData.content.items" :key="index"
                            :value="item"
                        >
                            {{'itemLabels' in formElementData.content ? formElementData.content.itemLabels[index] : item}}
                        </option>
                    </select>
                </div>
            </template>

            <template v-if="formElementData.type == 'radioGroup'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">
                    <span v-for="(item, index) in formElementData.content.items" :key="item">
                        <input type="radio" :value="item" v-model="formElementData.content.value" class="variform-radio"/>
                        {{'itemLabels' in formElementData.content ? formElementData.content.itemLabels[index] : item}}
                    </span>
                </div>
            </template>

            <template v-if="formElementData.type == 'checkboxGroup'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">
                    <template v-for="(item, index) in formElementData.content.items" >
                        <input :key="item" type="checkbox" v-model="formElementData.content.values[item]" class="variform-checkbox"/>
                        {{'itemLabels' in formElementData.content ? formElementData.content.itemLabels[index] : item}}
                    </template>
                </div>
            </template>

            <template v-if="formElementData.type == 'nested'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">

                    <!-- display all children of the currently activated condition -->
                    <form-element v-for="(childData, index) in formElementData.content.children"
                        :key="index"
                        @delete="deleteChildElement"
                        :form-element-data="childData"
                        :slot-names="slotNames"
                        :validation-update="'validation' in childData ? childData.validation.validationUpdate : 0"
                    >

                        <!-- pass custom component down to the form elements of the nested conditional -->
                        <template v-for="slotName in slotNames" v-slot:[slotName]="slotProps">
                            <slot :name="slotName" :form-element-data="slotProps.formElementData"/>
                        </template>

                    </form-element>
                </div>

            </template>

            <template v-if="formElementData.type == 'nestedConditional'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">

                    <!-- display the dropdown that decides which children are displayed -->
                    <select v-model="formElementData.content.dropdownContent.value" class="variform-dropdown">
                        <option v-if="formElementData.content.dropdownContent.placeholder !== undefined" disabled value="">
                            {{formElementData.content.dropdownContent.placeholder}}
                        </option>
                        <option v-for="(item, index) in formElementData.content.dropdownContent.items" :key="index"
                            :value="item"
                        >
                            {{'itemLabels' in formElementData.content.dropdownContent ? formElementData.content.dropdownContent.itemLabels[index] : item}}
                        </option>
                    </select>

                    <!-- iterate over conditional children an check if the value of the dropdown equals the condition -->
                    <template v-for="conditionalChildren in formElementData.content.conditions">
                        <span class="display-none" :key="conditionalChildren.condition"></span>
                        <template v-if="conditionalChildren.condition === formElementData.content.dropdownContent.value">

                            <!-- display all children of the currently activated condition -->
                            <form-element v-for="(childData, index) in conditionalChildren.children"
                                :key="index"
                                @delete="deleteChildElement"
                                :form-element-data="childData"
                                :slot-names="slotNames"
                                :validation-update="'validation' in childData ? childData.validation.validationUpdate : 0"
                            >

                                <!-- pass custom component down to the form elements of the nested conditional -->
                                <template v-for="slotName in slotNames" v-slot:[slotName]="slotProps">
                                    <slot :name="slotName" :form-element-data="slotProps.formElementData"/>
                                </template>

                            </form-element>
                        </template>
                    </template>
                </div>
            </template>

            <template v-if="formElementData.type === 'nestedConditionalRadio'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">

                    <!-- display the radio box that decides which children are rendered -->
                    <span v-for="(item, index) in formElementData.content.radioGroupContent.items" :key="index">
                        <input type="radio" :value="item" v-model="formElementData.content.radioGroupContent.value" class="variform-radio"/>
                        {{'itemLabels' in formElementData.content.radioGroupContent ? formElementData.content.radioGroupContent.itemLabels[index] : item}}
                    </span>

                    <!-- iterate over conditional children an check if the value of the radio group equals the condition -->
                    <template v-for="conditionalChildren in formElementData.content.conditions">
                        <span class="display-none" :key="conditionalChildren.condition"></span>
                        <template v-if="conditionalChildren.condition === formElementData.content.radioGroupContent.value">

                            <!-- display all children of the currently activated condition -->
                            <form-element v-for="childData in conditionalChildren.children"
                                :key="childData.condition"
                                @delete="deleteChildElement"
                                :form-element-data="childData"
                                :slot-names="slotNames"
                                :validation-update="'validation' in childData ? childData.validation.validationUpdate : 0"
                            >

                                <!-- pass custom component down to the form elements of the nested conditional -->
                                <template v-for="slotName in slotNames" v-slot:[slotName]="slotProps">
                                    <slot :name="slotName" :form-element-data="slotProps.formElementData"/>
                                </template>

                            </form-element>
                        </template>
                    </template>
                </div>
            </template>

            <template v-if="formElementData.type === 'nestedConditionalCheckbox'">
                <div class="col-3">{{formElementData.content.label}}</div>
                <div :class="[isDeletable() ? 'col-8' : 'col-9']">

                    <!-- display the checkbox box that decides which children are rendered -->
                    <template v-for="(item, index) in formElementData.content.checkboxGroupContent.items" >
                        <input :key="index" type="checkbox" v-model="formElementData.content.checkboxGroupContent.values[item]" class="variform-checkbox"/>
                        {{'itemLabels' in formElementData.content.checkboxGroupContent ? formElementData.content.checkboxGroupContent.itemLabels[index] : item}}
                    </template>

                    <!-- iterate over conditional children an check if the value of the radio group equals the condition -->
                    <template v-for="conditionalChildren in formElementData.content.conditions">
                        <span class="display-none" :key="conditionalChildren.condition"></span>
                        <template v-if="conditionalChildren.condition in formElementData.content.checkboxGroupContent.values
                            && formElementData.content.checkboxGroupContent.values[conditionalChildren.condition] === true"
                        >
                            <h4 :key="conditionalChildren.condition + '_headline'">
                                {{formElementData.content.checkboxGroupContent.itemLabels[formElementData.content.checkboxGroupContent.items.indexOf(conditionalChildren.condition)]}}
                            </h4>

                            <!-- display all children of the currently activated condition -->
                            <form-element v-for="childData in conditionalChildren.children"
                                :key="childData.condition"
                                @delete="deleteChildElement"
                                :form-element-data="childData"
                                :slot-names="slotNames"
                                :validation-update="'validation' in childData ? childData.validation.validationUpdate : 0"
                            >

                                <!-- pass custom component down to the form elements of the nested conditional -->
                                <template v-for="slotName in slotNames" v-slot:[slotName]="slotProps">
                                    <slot :name="slotName" :form-element-data="slotProps.formElementData"/>
                                </template>

                            </form-element>
                        </template>
                    </template>
                </div>
            </template>

            <!-- display custom components -->
            <slot v-for="slotName in slotNames"
                :name="slotName"
                :form-element-data="formElementData"
            />

            <!-- display this button if deletable is set in the formElementData of this FormElement -->
            <div v-if="isDeletable()" class="col-1 float-right">
                <button @click="emitDeleteElement"><font-awesome-icon icon="times"/></button>
            </div>

        </div>

        <!-- display the validation error of this field if there is one -->
        <div class="error-text">
            {{validationError}}
        </div>
    </div>

</template>

<script lang="ts">
import {
    Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import _ from 'lodash';
import {
    FormElementData, GroupContent, NestedConditionalCheckboxContent, NestedConditionalContent, NestedConditionalRadioContent, NestedFormElementContent,
} from './datatypes';

@Component({
    name: 'FormElement',
})
export default class App extends Vue {

    validationError: string = ''

    @Prop()
    formElementData!: FormElementData

    @Prop()
    validationUpdate!: number

    @Prop({ default: ['default'] })
    slotNames!: Array<string>

    // copy the actionAddElement from the group and add it at the end of the group items
    addElementToGroup(group: FormElementData) {
        const groupContent = group.content as GroupContent;
        groupContent.items.push(JSON.parse(JSON.stringify(groupContent.actionAddElement)));
    }

    // delete the given element that emitted the delete event by calling emitDeleteElement
    deleteChildElement(element: FormElementData) {
        if (this.formElementData.type === 'group') {
            const groupContent = this.formElementData.content as GroupContent;
            const idx = groupContent.items.indexOf(element);
            if (idx > -1) {
                groupContent.items.splice(idx, 1);
            }

        } else if (this.formElementData.type === 'nested') {
            const nestedContent = this.formElementData.content as NestedFormElementContent;
            const idx = nestedContent.children.indexOf(element);
            if (idx > -1) {
                nestedContent.children.splice(idx, 1);
            }

        } else if (this.formElementData.type === 'nestedConditional') {
            const content = this.formElementData.content as NestedConditionalContent;
            // delete the element of the currently active condition that emitted the delete event
            for (const condition of content.conditions) {
                if (condition.condition === content.dropdownContent.value) {
                    const idx = condition.children.indexOf(element);
                    condition.children.splice(idx, 1);
                    break;
                }
            }

        } else if (this.formElementData.type === 'nestedConditionalRadio') {
            const content = this.formElementData.content as NestedConditionalRadioContent;
            // delete the element of the currently active condition that emitted the delete event
            for (const condition of content.conditions) {
                if (condition.condition === content.radioGroupContent.value) {
                    const idx = condition.children.indexOf(element);
                    condition.children.splice(idx, 1);
                    break;
                }
            }

        } else if (this.formElementData.type === 'nestedConditionalCheckbox') {
            const content = this.formElementData.content as NestedConditionalCheckboxContent;
            // search all currently active conditions for the element that emitted the delete event and delete it
            for (const condition of content.conditions) {
                if (content.checkboxGroupContent.values[condition.condition] === true) {
                    const idx = condition.children.indexOf(element);
                    if (idx !== -1) {
                        condition.children.splice(idx, 1);
                        break;
                    }
                }
            }
        }
    }

    // emit a delete event that can be captured by the surrounding component to delete this instance
    emitDeleteElement() {
        this.$emit('delete', this.formElementData);
    }

    // template utility functions
    isDeletable() {
        return 'deletable' in this.formElementData && this.formElementData.deletable;
    }

    @Watch('validationUpdate')
    onValidationUpdate() {
        const validationError = _.get(this.formElementData, 'validation.validationError', null);
        if (validationError) {
            this.validationError = validationError;
        } else {
            this.validationError = '';
        }
    }

}
</script>
