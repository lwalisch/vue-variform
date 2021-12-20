import { FormElementData, GroupContent, InputContent } from './variform/datatypes';

export default {
    type: 'group',
    content: {
        headlineSize: 'h2',
        label: 'form',
        items: [
            {
                type: 'input',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'input' },
                content: {
                    label: 'test',
                    value: '',
                } as InputContent,
            },
            {
                type: 'custom',
                dataMapping: { formKeypath: 'content.value', externalKeypath: 'customdate' },
                content: {
                    label: 'date',
                    value: 'asdfasdf',
                },
            },
        ],
    } as GroupContent,
} as FormElementData;
