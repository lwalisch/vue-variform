import {
    FormElementData, GroupContent, InputContent, DropdownContent, RadioGroupContent, CheckboxGroupContent2, NestedConditionalContent,
    HiddenContent, NestedConditionalRadioContent, NestedConditionalCheckboxContent, NestedFormElementContent,
} from './variform/datatypes';

export default {
    type: 'group',
    content: {
        label: 'form',
        headlineSize: 'h2',
        actionAddElement: {
            type: 'input',
            deletable: true,
            dataMapping: { formKeypath: 'content.value', externalKeypath: 'additionalInput' },
            content: {
                label: 'additional line',
                value: '1',
            } as InputContent,
        } as FormElementData,
        items: [
            {
                type: 'custom',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'customdate' },
                content: {
                    value: '',
                },
            },
            {
                type: 'group',
                content: {
                    headlineSize: 'h3',
                    label: 'sub group',
                    items: [
                        {
                            type: 'input',
                            dataMapping: { formKeypath: 'content.value', externalKeypath: 'subInput' },
                            content: {
                                label: 'sub input',
                                value: '',
                            } as InputContent,
                        },

                    ],
                } as GroupContent,
            },
            {
                type: 'input',
                deletable: true,
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'input1' },
                validation: { validator: 'validateSocial', validationUpdate: 0 },
                content: {
                    label: 'inputlabel',
                    value: '',
                    placeholder: 'placeholder',
                } as InputContent,
            },
            {
                type: 'hidden',
                dataMapping: { formKeypath: 'content.hidden', externalKeypath: 'hiddenContent' },
                content: {
                    hidden: {
                        hiddenProp1: 'test',
                        hiddenProp2: 'test',
                    },
                } as HiddenContent,
            },
            {
                type: 'inputNumber',
                deletable: true,
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'number1' },
                content: {
                    label: 'numberlabel',
                    value: '1',
                } as InputContent,
            },
            {
                type: 'dropdown',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'dropdown1' },
                content: {
                    label: 'dropdownlabel',
                    value: '',
                    items: ['item1', 'item2', 'item3'],
                    itemLabels: ['Item1', 'Item2', 'Item3'],
                    placeholder: 'Please select...',
                } as DropdownContent,
            },
            {
                type: 'radioGroup',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'radio1' },
                content: {
                    label: 'radiolabel',
                    items: ['radio1', 'radio2', 'radio3'],
                    itemLabels: ['Radio1', 'Radio2', 'Radio3'],
                    value: 'radio1',
                } as RadioGroupContent,
            },
            {
                type: 'checkboxGroup',
                dataMapping: { formKeypath: 'content.values', externalKeypath: 'checkboxtest' },
                content: {
                    label: 'checkboxlabel',
                    items: ['cb1', 'cb2', 'cb3'],
                    itemLabels: ['Cb1', 'Cb2', 'Cb3'],
                    values: { cb1: false, cb2: false, cb3: false },
                } as CheckboxGroupContent2,
            },
            {
                type: 'nested',
                content: {
                    label: 'Nested Element',
                    children: [
                        {
                            type: 'input',
                            deletable: true,
                            dataMapping: { formKeypath: 'content.value', externalKeypath: 'input1' },
                            validation: { validator: 'validateSocial' },
                            content: {
                                label: 'inputlabel',
                                value: '',
                                placeholder: 'placeholder',
                            } as InputContent,
                        },
                    ],
                } as NestedFormElementContent,
            },
            {
                type: 'nestedConditional',
                dataMapping: { formKeypath: 'content.dropdownContent.value', externalKeypath: 'nestedCondition1' },
                content: {
                    label: 'Nested conditional element',
                    dropdownContent: {
                        label: 'condition',
                        items: ['condition1', 'condition2'],
                        placeholder: 'Choose condition...',
                        value: '',
                    },
                    conditions: [
                        {
                            condition: 'condition1',
                            children: [
                                {
                                    type: 'input',
                                    deletable: true,
                                    dataMapping: { formKeypath: 'content.value', externalKeypath: 'condition.nestedInputCondition1' },
                                    content: {
                                        label: 'inputlabel',
                                        value: '',
                                        placeholder: 'placeholder',
                                    } as InputContent,
                                },
                                {
                                    type: 'custom',
                                    dataMapping: { formKeypath: 'content.value', externalKeypath: 'customdate1' },
                                    content: {
                                        value: '',
                                    },
                                },
                                {
                                    type: 'custom2',
                                    content: {
                                        value: '',
                                    },
                                },
                            ],
                        },
                        {
                            condition: 'condition2',
                            children: [{
                                type: 'inputNumber',
                                deletable: true,
                                dataMapping: { formKeypath: 'content.value', externalKeypath: 'condition.nestedInputCondition2' },
                                content: {
                                    label: 'numberlabel',
                                    value: '1',
                                } as InputContent,
                            }],
                        },
                    ],
                } as NestedConditionalContent,
            },
            {
                type: 'nestedConditionalRadio',
                dataMapping: { formKeypath: 'content.radioGroupContent.value', externalKeypath: 'conditionRadio.condition' },
                content: {
                    label: 'ConditionalRadioLabel',
                    radioGroupContent: {
                        items: ['condition1', 'condition2'],
                        value: '',
                    },
                    conditions: [
                        {
                            condition: 'condition1',
                            children: [{
                                type: 'input',
                                deletable: true,
                                dataMapping: { formKeypath: 'content.value', externalKeypath: 'conditionRadio.nestedRadioCondition1' },
                                content: {
                                    label: 'inputlabel',
                                    value: '',
                                    placeholder: 'placeholder',
                                } as InputContent,
                            }],
                        },
                        {
                            condition: 'condition2',
                            children: [{
                                type: 'inputNumber',
                                deletable: true,
                                dataMapping: { formKeypath: 'content.value', externalKeypath: 'conditionRadio.nestedRadioCondition2' },
                                content: {
                                    label: 'numberlabel',
                                    value: '1',
                                } as InputContent,
                            }],
                        },
                    ],
                } as NestedConditionalRadioContent,

            },
            {
                type: 'nestedConditionalCheckbox',
                dataMapping: { formKeypath: 'content.checkboxGroupContent.values', externalKeypath: 'conditionCheck.conditions' },
                content: {
                    label: 'ConditionalCheckbox',
                    checkboxGroupContent: {
                        label: 'test',
                        items: ['condition1', 'condition2'],
                        itemLabels: ['condition1_label', 'condition2_label'],
                        values: { condition1: false, condition2: false },
                    },
                    conditions: [
                        {
                            condition: 'condition1',
                            children: [{
                                type: 'input',
                                deletable: true,
                                dataMapping: { formKeypath: 'content.value', externalKeypath: 'conditionCheck.nestedCbxCondition1' },
                                content: {
                                    label: 'inputlabel',
                                    value: '',
                                    placeholder: 'placeholder',
                                } as InputContent,
                            }],
                        },
                        {
                            condition: 'condition2',
                            children: [{
                                type: 'inputNumber',
                                deletable: true,
                                dataMapping: { formKeypath: 'content.value', externalKeypath: 'conditionCheck.nestedInputCondition2' },
                                content: {
                                    label: 'numberlabel',
                                    value: '1',
                                } as InputContent,
                            }],
                        },
                    ],
                } as NestedConditionalCheckboxContent,
            },
        ],
    } as GroupContent,
} as FormElementData;
