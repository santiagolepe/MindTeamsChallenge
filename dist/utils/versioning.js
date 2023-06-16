"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versioning = void 0;
const versioning = (version) => {
    return (req, res, next) => {
        if (req.baseUrl.startsWith(`/api/v${version}`)) {
            req.baseUrl = req.baseUrl.replace(`/api/v${version}`, "");
            next();
        }
        else {
            res.status(404).json({ message: "API version not found" });
        }
    };
};
exports.versioning = versioning;
//# sourceMappingURL=versioning.js.map