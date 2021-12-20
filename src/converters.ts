import _ from 'lodash';
import {
    FormElementData, DropdownContent, GroupContent,
} from './variform/datatypes';

async function populateCountryCodes(formElementTemplate: DropdownContent, extData: any) {
    const content = formElementTemplate;

    // consider that extData may be not present in the parsed data, then set a default value
    if (extData === null) {
        content.value = '';
    } else {
        content.value = extData;
    }
    const rawResponse = await fetch('http://localhost:3000/countryCodes');
    const response = await rawResponse.json();
    content.itemLabels = response.deLabels;
    content.items = response.codes;
    return content;
}

function converteToExtCountry(content: DropdownContent) {
    return content.value;
}

export default {
    populateCountryCodes,
    converteToExtCountry,
};
