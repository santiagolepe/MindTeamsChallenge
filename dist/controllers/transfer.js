"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransfer = void 0;
const transfer_1 = __importDefault(require("../models/transfer"));
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /transfers
 */
async function getTransfer(req, res) {
    try {
        const { accountId, userId, startedAt, endedAt } = req.query;
        const filter = {};
        if (accountId) {
            filter.account = accountId;
        }
        if (userId) {
            filter.user = userId;
        }
        if (startedAt) {
            filter.started_at = { $gte: new Date(startedAt) };
        }
        if (endedAt) {
            filter.ended_at = { $lte: new Date(endedAt) };
        }
        const transferLogs = await transfer_1.default.find(filter)
            .populate("user", "-password")
            .populate("account");
        res.json(transferLogs);
    }
    catch (error) {
        console.error("Failed to fetch transfers", { query: req.query, error });
        res.status(500).json({
            error: "Failed to fetch transfers, please try again",
        });
    }
}
exports.getTransfer = getTransfer;
;
//# sourceMappingURL=transfer.js.map