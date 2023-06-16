"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transfer_1 = __importDefault(require("./transfer"));
const accountSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    client: { type: String, required: true },
    responsible: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    team: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
// TODO: imporve adding batching
accountSchema.pre("save", async function (next) {
    // if has version means its an update
    if (this.__v >= 0) {
        // if we have adding or deleting users from teams
        if (this.isModified("team")) {
            let preAccount = await Account.findById(this._id);
            if (preAccount) {
                const insertions = this.team.filter(team => !(preAccount === null || preAccount === void 0 ? void 0 : preAccount.team.includes(team)));
                const delettions = preAccount.team.filter(team => !this.team.includes(team));
                if (insertions.length) {
                    let insert = insertions.map(user => ({ user, account: this._id }));
                    await transfer_1.default.insertMany(insert);
                }
                if (delettions.length) {
                    await transfer_1.default.updateMany({ user: { $in: delettions }, account: this._id }, { ended_at: new Date() }, { new: false });
                }
            }
        }
        ;
        // create all new transfers logs
    }
    else {
        let insert = this.team.map(user => ({ user, account: this._id }));
        await transfer_1.default.insertMany(insert);
    }
    next();
});
const Account = (0, mongoose_1.model)("Account", accountSchema);
exports.default = Account;
//# sourceMappingURL=account.js.map