"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map