"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../routes/auth"));
const transfer_1 = __importDefault(require("../routes/transfer"));
const mongo_1 = __importDefault(require("../services/mongo"));
const user_1 = __importDefault(require("../models/user"));
const account_1 = __importDefault(require("../models/account"));
const transfer_2 = __importDefault(require("../models/transfer"));
const helper_1 = require("./helper");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/transfers", transfer_1.default);
let tokenAdmin;
let userId;
let user;
let account;
let started_at = new Date();
started_at.setDate(started_at.getDate() - 1);
let ended_at = new Date();
beforeAll(async () => {
    await mongo_1.default.init();
    await user_1.default.deleteMany({});
    await account_1.default.deleteMany({});
    await transfer_2.default.deleteMany({});
    await user_1.default.create(helper_1.users.admin);
    user = await user_1.default.create(helper_1.users.user);
    userId = user._id;
    account = await account_1.default.create({
        name: "Test Account",
        client: "Test Client",
        responsible: userId,
        team: [userId],
    });
});
describe("Transfer Log filter", () => {
    it("get admin token", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send(helper_1.users.admin);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("token");
        tokenAdmin = res.body.token;
    });
    it("should return 401 for unauthorized users", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/transfers");
        expect(res.status).toEqual(401);
    });
    it("should admin get filtered transfer logs", async () => {
        const filter = {
            account: String(account._id),
            user: String(user._id),
            started_at,
            ended_at,
        };
        const res = await (0, supertest_1.default)(app)
            .get("/transfers")
            .query(filter)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body).toHaveLength(1);
    });
});
afterAll(async () => {
    await user_1.default.deleteMany({});
    await account_1.default.deleteMany({});
    await transfer_2.default.deleteMany({});
});
//# sourceMappingURL=transfer.test.js.map