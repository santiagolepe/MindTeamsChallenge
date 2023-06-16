"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const server_1 = __importDefault(require("../services/server"));
const swagger_1 = __importDefault(require("../config/swagger"));
const options = {
    swaggerDefinition: swagger_1.default,
    apis: ["./src/routes/*.ts"], // all routes with them JSDoc comments
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = {
    init() {
        var _a;
        (_a = server_1.default.app) === null || _a === void 0 ? void 0 : _a.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    }
};
//# sourceMappingURL=swagger.js.map