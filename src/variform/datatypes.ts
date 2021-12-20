interface FormElementData {
    type: 'input'|'numberInput'|'dropdown'|'headline'|'group'|'date1'|'date2'|'checkboxGroup'|'radioGroup'|'nested'
        |'nestedConditional'|'nestedConditionalRadio'|'nestedConditionalCheckbox'|'hidden';
    content: InputContent|DropdownContent|HeadlineContent|GroupContent|NestedFormElementContent
        |NestedConditionalContent|CheckboxGroupContent|RadioGroupContent|NumberInputContent
        |HiddenContent|NestedConditionalRadioContent|NestedConditionalCheckboxContent;
    dataMapping?: DataMapping;
    validation?: Validation;
    deletable?: boolean;
    class? : string;
}

interface InputContent {
    label: string;
    value: string;
    placeholder: string;
}

interface NumberInputContent {
    label: string;
    value: number;
    placeholder: string;
}

interface DropdownContent {
    label: string;
    items: string[];
    itemLabels?: string[];
    value: string;
    placeholder: string;
}

interface HeadlineContent {
    value: string;
    size: number;
}

interface GroupContent {
    label?: string;
    headlineSize?: 'h1'|'h2'|'h3';
    items: FormElementData[];
    actionAddElement?: FormElementData;
}

interface ConditionalChildren {
    condition: string;
    children: FormElementData[];
}

interface CheckboxGroupContent {
    label: string;
    items: string[];
    itemLabels?: string[];
    values: string[];
}

interface CheckboxGroupContent2 {
    label: string;
    itemLabels?: string[];
    items: string[];

    // the values property is expected to be an object.
    // the keys should be the same as the values in the items array
    // and the values are bools indicating if they are selected or not
    values: any;
}

interface RadioGroupContent {
    label: string;
    items: string[];
    itemLabels?: string[];
    value: string;
}

interface DataMapping {
    externalKeypath: string;
    formKeypath: string;
    convertToExternalData: string;
    convertToFormData: string;
}

interface HiddenContent {
    hidden: any;
}

interface NestedFormElementContent {
    label: string;
    children: FormElementData[];
}

interface NestedConditionalContent {
    label: string;
    dropdownContent: DropdownContent;
    conditions: ConditionalChildren[];
}

interface NestedConditionalRadioContent {
    label: string;
    radioGroupContent: RadioGroupContent;
    conditions: ConditionalChildren[];
}

interface NestedConditionalCheckboxContent {
    label: string;
    checkboxGroupContent: CheckboxGroupContent2
    conditions: ConditionalChildren[];
}

interface Validation {
    validator: string;
    validationError?: string;
    validationUpdate: number; // this property should be set to 0 (zero) if validation is used
}

interface ValidationResponse {
    valid: boolean;
    error?: string;
}

export {
    FormElementData,
    InputContent,
    DropdownContent,
    HeadlineContent,
    GroupContent,
    NestedFormElementContent,
    DataMapping,
    CheckboxGroupContent,
    CheckboxGroupContent2,
    RadioGroupContent,
    NumberInputContent,
    HiddenContent,
    NestedConditionalContent,
    NestedConditionalCheckboxContent,
    NestedConditionalRadioContent,
    Validation,
    ValidationResponse,
};
