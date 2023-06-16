"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const transferSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    account: { type: mongoose_1.Schema.Types.ObjectId, ref: "Account", required: true },
    started_at: { type: Date, required: true, default: Date.now },
    ended_at: { type: Date },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const Transfer = (0, mongoose_1.model)("Transfer", transferSchema);
exports.default = Transfer;
//# sourceMappingURL=transfer.js.map