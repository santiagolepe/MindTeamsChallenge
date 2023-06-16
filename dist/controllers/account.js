"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserAccount = exports.addUserAccount = exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.getAcount = exports.getAcounts = void 0;
const account_1 = __importDefault(require("../models/account"));
const user_1 = __importDefault(require("../models/user"));
const validator_1 = require("../utils/validator");
const schemas_1 = require("../utils/schemas");
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /accounts
 */
async function getAcounts(req, res) {
    try {
        const accounts = await account_1.default.find().populate("responsible").populate("team");
        res.json(accounts);
    }
    catch (error) {
        console.error("Failed to fetch accounts");
        res.status(500).json({
            error: "Failed to fetch accounts, please try again",
        });
    }
}
exports.getAcounts = getAcounts;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /accounts/:id
 */
async function getAcount(req, res) {
    try {
        const account = await account_1.default.findById(req.params.id).populate("responsible").populate("team");
        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }
        res.json(account);
    }
    catch (error) {
        console.error("Failed to fetch account", { params: req.params });
        res.status(500).json({
            error: "Failed to fetch account, please try again",
        });
    }
}
exports.getAcount = getAcount;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * POST /accounts
 */
async function createAccount(req, res) {
    const { error, data } = await (0, validator_1.validator)(schemas_1.CreateAccountSchema, req.body);
    if (error) {
        res.status(400).send(error);
        return;
    }
    try {
        let account = new account_1.default(data);
        account = await account.save();
        let response = await account_1.default.findById(account._id).populate("responsible").populate("team");
        res.status(201).json(response);
    }
    catch (error) {
        console.error("Failed to create account", { body: req.body, error });
        res.status(500).json({
            error: "Failed to create account, please try again",
        });
    }
}
exports.createAccount = createAccount;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PUT /accounts/:id
 */
async function updateAccount(req, res) {
    const { error, data } = await (0, validator_1.validator)(schemas_1.CreateAccountSchema, req.body);
    if (error) {
        res.status(400).send(error);
        return;
    }
    try {
        const { id } = req.params;
        const account = await account_1.default.findByIdAndUpdate(id, data, { new: true }).populate("responsible").populate("team");
        res.json(account);
    }
    catch (error) {
        console.error("Failed to update account", { body: req.body, params: req.params, error });
        res.status(500).json({
            error: "Failed to update account, please try again",
        });
    }
}
exports.updateAccount = updateAccount;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * DELETE /accounts/:id
 */
async function deleteAccount(req, res) {
    try {
        const { id } = req.params;
        await account_1.default.findByIdAndRemove(id);
        res.sendStatus(204);
    }
    catch (error) {
        console.error("Failed to delete account", { params: req.params, error });
        res.status(500).json({
            error: "Failed to delete account, please try again",
        });
    }
}
exports.deleteAccount = deleteAccount;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PATCH /accounts/:id/add-user/:userId
 */
async function addUserAccount(req, res) {
    try {
        const userId = req.params.userId;
        const account = await account_1.default.findById(req.params.id);
        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }
        const user = await user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (!account.team.includes(user._id)) {
            account.team.push(user._id);
            await account.save();
        }
        res.json(account);
    }
    catch (error) {
        console.error("Failed to add user to account team", { params: req.params, error });
        res.status(500).json({
            error: "Failed to add user to account team, please try again",
        });
    }
}
exports.addUserAccount = addUserAccount;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PATCH /accounts/:id/remove-user/:userId
 */
async function removeUserAccount(req, res) {
    try {
        const userId = req.params.userId;
        const account = await account_1.default.findById(req.params.id);
        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }
        const user = await user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        account.team.pull(userId);
        await account.save();
        res.json(account);
    }
    catch (error) {
        console.error("Failed to add user to account team", { params: req.params, error });
        res.status(500).json({
            error: "Failed to add user to account team, please try again",
        });
    }
}
exports.removeUserAccount = removeUserAccount;
;
//# sourceMappingURL=account.js.map