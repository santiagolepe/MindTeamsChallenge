"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const account_1 = __importDefault(require("./routes/account"));
const transfer_1 = __importDefault(require("./routes/transfer"));
const versioning_1 = require("./utils/versioning");
const error_1 = require("./middlewares/error");
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./services/server"));
dotenv_1.default.config();
exports.default = {
    init: () => {
        var _a, _b, _c, _d, _e;
        const apiVersion = process.env.API_VERSION || '1';
        (_a = server_1.default.app) === null || _a === void 0 ? void 0 : _a.use(`/auth`, auth_1.default);
        (_b = server_1.default.app) === null || _b === void 0 ? void 0 : _b.use(`/api/v${apiVersion}/users`, (0, versioning_1.versioning)(apiVersion), user_1.default);
        (_c = server_1.default.app) === null || _c === void 0 ? void 0 : _c.use(`/api/v${apiVersion}/accounts`, (0, versioning_1.versioning)(apiVersion), account_1.default);
        (_d = server_1.default.app) === null || _d === void 0 ? void 0 : _d.use(`/api/v${apiVersion}/transfers`, (0, versioning_1.versioning)(apiVersion), transfer_1.default);
        (_e = server_1.default.app) === null || _e === void 0 ? void 0 : _e.use(error_1.errorMiddleware);
        console.info('Routes loaded ');
    }
};
//# sourceMappingURL=routes.js.map