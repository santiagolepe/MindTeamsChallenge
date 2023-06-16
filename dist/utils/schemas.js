"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountSchema = exports.CreateUserSchema = exports.UpdateUserSchema = exports.Roles = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Roles;
(function (Roles) {
    Roles["super_admin"] = "super_admin";
    Roles["admin"] = "admin";
    Roles["user"] = "user";
})(Roles || (exports.Roles = Roles = {}));
;
class UpdateUserSchema {
    constructor() {
        this.name = '';
        this.email = '';
        this.role = Roles.user;
    }
}
exports.UpdateUserSchema = UpdateUserSchema;
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], UpdateUserSchema.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), {
        message: 'Invalid email, example: user@mind.com'
    })
], UpdateUserSchema.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(Roles)
], UpdateUserSchema.prototype, "role", void 0);
class CreateUserSchema extends UpdateUserSchema {
    constructor() {
        super(...arguments);
        this.password = '';
    }
}
exports.CreateUserSchema = CreateUserSchema;
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/), {
        message: 'password should contain atleast one number and one special character and must be min 8 and max 16 characters'
    })
], CreateUserSchema.prototype, "password", void 0);
class CreateAccountSchema {
    constructor() {
        this.name = '';
        this.client = '';
        this.responsible = '';
        this.team = [];
    }
}
exports.CreateAccountSchema = CreateAccountSchema;
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], CreateAccountSchema.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], CreateAccountSchema.prototype, "client", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], CreateAccountSchema.prototype, "responsible", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], CreateAccountSchema.prototype, "team", void 0);
//# sourceMappingURL=schemas.js.map