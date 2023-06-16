"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.users = void 0;
const schemas_1 = require("../utils/schemas");
exports.users = {
    admin: {
        name: 'admin',
        email: 'admin@mind.com',
        password: 'password1@',
        role: schemas_1.Roles.super_admin,
        skills: 'typescript, javascript, nodeJs, ReactJs',
        englishLevel: 'B2',
        resumeLink: 'https://www.linkedin.com/in/santiagolepe/'
    },
    user: {
        name: 'user',
        email: 'user@mind.com',
        password: 'password1@',
        role: schemas_1.Roles.user
    }
};
const sleep = (sec = 1) => new Promise(resolve => setTimeout(resolve, sec * 1000));
exports.sleep = sleep;
//# sourceMappingURL=helper.js.map