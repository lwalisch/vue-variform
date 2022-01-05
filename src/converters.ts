import _ from 'lodash';
import {
    FormElementData, InputContent,
} from './variform/datatypes';

function extendGroupToForm(formElementTemplate: FormElementData[], extData: any) {
    (formElementTemplate[0].content as InputContent).value = extData.extendGroupInput;
    (formElementTemplate[1].content as any).value = extData.extendGroupDate;
    return formElementTemplate;
}

function extendGroupToExternal(groupItems: FormElementData[]) {
    return {
        extendGroupInput: (groupItems[0].content as InputContent).value,
        extendGroupDate: (groupItems[1].content as any).value,
    };
}

export default {
    extendGroupToExternal,
    extendGroupToForm,
};
