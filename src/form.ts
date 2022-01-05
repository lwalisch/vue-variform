import {
    CheckboxGroupContent2, FormElementData, GroupContent, InputContent, NestedConditionalContent, RadioGroupContent,
} from './variform/datatypes';

export default {
    type: 'group',
    content: {
        headlineSize: 'h2',
        label: 'form',
        items: [
            {
                type: 'input',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'textinput' },
                validation: { validator: 'validateInputExactlyFourPlaces' },
                content: {
                    label: 'text input',
                    value: '',
                } as InputContent,
            },
            {
                type: 'custom',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'customdate' },
                content: {
                    label: 'date',
                    value: '',
                },
            },
            {
                type: 'checkboxGroup',
                dataMapping: { formKeypath: 'content.values', externalKeypath: 'checkboxinput' },
                content: {
                    label: 'checkbox',
                    items: ['cb1', 'cb2', 'cb3'],
                    itemLabels: ['Cb1', 'Cb2', 'Cb3'],
                    values: { cb1: false, cb2: false, cb3: false },
                } as CheckboxGroupContent2,
            },
            {
                type: 'radioGroup',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'radioinput' },
                content: {
                    label: 'radio',
                    items: ['radio1', 'radio2', 'radio3'],
                    itemLabels: ['Radio1', 'Radio2', 'Radio3'],
                    value: 'radio1',
                } as RadioGroupContent,
            },
            {
                type: 'nestedConditional',
                dataMapping: { formKeypath: 'content.dropdownContent.value', externalKeypath: 'nestedCondition.condition' },
                content: {
                    label: 'Nested conditional',
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
                                    dataMapping: { formKeypath: 'content.value', externalKeypath: 'nestedCondition.condition1.input' },
                                    content: {
                                        label: 'inputlabel',
                                        value: '',
                                        placeholder: 'placeholder',
                                    } as InputContent,
                                },
                                {
                                    type: 'custom',
                                    dataMapping: { formKeypath: 'content.value', externalKeypath: 'nestedCondition.condition1.date' },
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
                                dataMapping: { formKeypath: 'content.value', externalKeypath: 'nestedCondition.condition2.number' },
                                content: {
                                    label: 'numberlabel',
                                    value: '1',
                                } as InputContent,
                            }],
                        },
                    ],
                } as NestedConditionalContent,
            },
        ],
        actionAddElement: {
            dataMapping: {
                formKeypath: 'content.items', externalKeypath: 'extendGroup', convertToFormData: 'extendGroupToForm', convertToExternalData: 'extendGroupToExternal',
            },
            type: 'group',
            label: 'extendable group',
            content: {
                items: [
                    {
                        type: 'input',
                        content: { label: 'extend input', value: '' },
                    },
                    {
                        type: 'custom',
                        content: { label: 'extend date', value: '' },
                    },
                ],
            } as GroupContent,
        } as FormElementData,
    } as GroupContent,
} as FormElementData;
