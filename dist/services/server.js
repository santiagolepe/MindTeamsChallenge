"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("../config/logger");
const server_1 = __importDefault(require("../lib/server"));
const express_1 = __importDefault(require("express"));
const Server = {
    init() {
        this.app = (0, express_1.default)();
        this.server = new server_1.default(this.app); // Start server
        // addons
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(logger_1.logger);
        this.app.use(express_1.default.json());
        // Log activity
        this.app.use(function (req, res, next) {
            let remoteAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            console.info({
                message: {
                    description: 'Middleware Incomming request',
                    data: `remoteAddress:${remoteAddress} method:${req.method} url:${req.url}`
                }
            });
            return next();
        });
        return this;
    }
};
exports.default = Server;
//# sourceMappingURL=server.js.map