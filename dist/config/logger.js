"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "../../error.log"), {
    flags: "a",
});
exports.logger = (0, morgan_1.default)("combined", {
    skip: (req, res) => res.statusCode < 400,
    stream: logStream,
});
//# sourceMappingURL=logger.js.map