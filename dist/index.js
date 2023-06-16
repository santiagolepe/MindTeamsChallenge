"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const mongo_1 = __importDefault(require("./services/mongo"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = __importDefault(require("./services/swagger"));
try {
    server_1.default.init();
    mongo_1.default.init();
    swagger_1.default.init();
    routes_1.default.init();
}
catch (error) {
    console.error({
        message: {
            description: 'Start app',
            trace: error.stack || error.trace,
            error
        }
    });
    // exit node and send info to kubernetes
    process.exit(1);
}
//# sourceMappingURL=index.js.map