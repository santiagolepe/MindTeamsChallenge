"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = exports.getProfile = void 0;
const user_1 = __importDefault(require("../models/user"));
const validator_1 = require("../utils/validator");
const schemas_1 = require("../utils/schemas");
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /users/profile
 */
async function getProfile(req, res) {
    try {
        const user = await user_1.default.findById(req.userId).select('-password');
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error("Failed to fetch profile", { userId: req.userId });
        res.status(500).json({
            error: "Failed to fetch profile, please try again",
        });
    }
}
exports.getProfile = getProfile;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /users/:id
 */
async function getUser(req, res) {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error("Failed to fetch user", { params: req.params });
        res.status(500).json({
            error: "Failed to fetch user, please try again",
        });
    }
}
exports.getUser = getUser;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /users
 */
async function getUsers(req, res) {
    try {
        const users = await user_1.default.find({}, "-password");
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Failed to fetch users");
        res.status(500).json({
            error: "Failed to fetch users, please try again",
        });
    }
}
exports.getUsers = getUsers;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * POST /users/:id
 */
async function createUser(req, res) {
    const { error, data } = await (0, validator_1.validator)(schemas_1.CreateUserSchema, req.body);
    if (error) {
        res.status(400).send(error);
        return;
    }
    try {
        const user = new user_1.default(data);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Failed to create user", { body: req.body, error });
        res.status(500).json({
            error: "Failed to create user, please try again",
        });
    }
}
exports.createUser = createUser;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PUT /users/:id
 */
async function updateUser(req, res) {
    const { error, data } = await (0, validator_1.validator)(schemas_1.UpdateUserSchema, req.body);
    if (error) {
        res.status(400).send(error);
        return;
    }
    try {
        const { id } = req.params;
        const user = await user_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.json(user);
    }
    catch (error) {
        console.error("Failed to update user", { body: req.body, params: req.params, error });
        res.status(500).json({
            error: "Failed to update user, please try again",
        });
    }
}
exports.updateUser = updateUser;
;
/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * DELETE /users/:id
 */
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        let user = await user_1.default.findById(id);
        if (user) {
            await user.remove();
        }
        res.sendStatus(204);
    }
    catch (error) {
        console.error("Failed to delete user", { params: req.params, error });
        res.status(500).json({
            error: "Failed to delete user, please try again",
        });
    }
}
exports.deleteUser = deleteUser;
;
//# sourceMappingURL=user.js.map