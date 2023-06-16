"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ValidationResult {
}
;
async function validator(classToConvert, body) {
    const result = new ValidationResult();
    result.data = (0, class_transformer_1.plainToClass)(classToConvert, body);
    await (0, class_validator_1.validate)(result.data, { skipMissingProperties: true }).then(errors => {
        // errors is an array of validation errors
        if (errors.length) {
            let errorTexts = Array();
            for (const errorItem of errors) {
                errorTexts = errorTexts.concat(errorItem.constraints);
            }
            result.error = errorTexts;
            return result;
        }
    });
    return result;
}
exports.validator = validator;
;
//# sourceMappingURL=validator.js.map