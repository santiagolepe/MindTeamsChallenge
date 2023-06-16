"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
// get all schemas from mongoose
const user_1 = __importDefault(require("../models/user"));
const account_1 = __importDefault(require("../models/account"));
const transfer_1 = __importDefault(require("../models/transfer"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "MIND Team API",
        description: "MIND Team Challenge",
        contact: {
            name: "Octavio Santiago",
            url: "https://github.com/santiagolepe/MindTeamsChallenge",
            email: "santiagolepe@gmail.com"
        }
    },
    components: {
        schemas: {
            User: (0, mongoose_to_swagger_1.default)(user_1.default),
            Account: (0, mongoose_to_swagger_1.default)(account_1.default),
            Transfer: (0, mongoose_to_swagger_1.default)(transfer_1.default),
        },
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
        },
        security: {
            BearerAuth: []
        }
    }
};
exports.default = swaggerDefinition;
//# sourceMappingURL=swagger.js.map