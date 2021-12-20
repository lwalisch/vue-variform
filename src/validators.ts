import { InputContent, ValidationResponse } from './variform/datatypes';

function validateInputExactlyFourPlaces(content: InputContent): ValidationResponse {
    if (content.value.length !== 4) {
        return {
            valid: false,
            error: `${content.label} requires exactly 4 places`,
        };
    }
    return { valid: true };
}

function validateSocial(content: InputContent): ValidationResponse {
    if (content.value !== null && content.value.length !== 10) {
        return {
            valid: false,
            error: `${content.label} requires exactly 10 places`,
        };
    }
    return { valid: true };
}

export default {
    validateInputExactlyFourPlaces,
    validateSocial,
};
