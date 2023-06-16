"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../routes/auth"));
const account_1 = __importDefault(require("../routes/account"));
const mongo_1 = __importDefault(require("../services/mongo"));
const user_1 = __importDefault(require("../models/user"));
const account_2 = __importDefault(require("../models/account"));
const helper_1 = require("./helper");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/accounts", account_1.default);
let tokenAdmin;
let userId;
let testAccount;
beforeAll(async () => {
    await mongo_1.default.init();
    await user_1.default.deleteMany({});
    await account_2.default.deleteMany({});
    await user_1.default.create(helper_1.users.admin);
    let user = await user_1.default.create(helper_1.users.user);
    userId = user._id;
});
describe("Account C.R.U.D.", () => {
    it("get admin token", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send(helper_1.users.admin);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("token");
        tokenAdmin = res.body.token;
    });
    it("should return 401 for unauthorized access", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/accounts");
        expect(res.status).toEqual(401);
    });
    it("should admin create a new account", async () => {
        const newAccount = {
            name: "Test Account",
            client: "Test Client",
            responsible: userId,
            team: [userId],
        };
        const res = await (0, supertest_1.default)(app)
            .post("/accounts")
            .send(newAccount)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(201);
        expect(res.body.client).toBe(newAccount.client);
        expect(res.body.responsible._id).toBe(String(userId));
        testAccount = res.body;
    });
    it("should admin return a list of accounts", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/accounts")
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body).toHaveLength(1);
    });
    it("should admin get account by ID", async () => {
        const res = await (0, supertest_1.default)(app)
            .get(`/accounts/${testAccount._id}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("_id", testAccount._id);
        expect(res.body.client).toBe(testAccount.client);
        expect(res.body.responsible._id).toBe(String(userId));
    });
    it("should admin update an account", async () => {
        testAccount.ename = "Updated Test Account";
        testAccount.client = "Updated Test Client";
        const res = await (0, supertest_1.default)(app)
            .put(`/accounts/${testAccount._id}`)
            .send(testAccount)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("name", testAccount.name);
        expect(res.body).toHaveProperty("client", testAccount.client);
    });
    it("should admin remove a user from the account's team", async () => {
        const res = await (0, supertest_1.default)(app)
            .patch(`/accounts/${testAccount._id}/remove-user/${userId}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body.team).not.toContainEqual(userId);
    });
    it("should admin add a user to the account's team", async () => {
        const res = await (0, supertest_1.default)(app)
            .patch(`/accounts/${testAccount._id}/add-user/${userId}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body.team).toHaveLength(1);
        expect(res.body.team).toContainEqual(String(userId));
    });
    it("should admin delete an account", async () => {
        const res = await (0, supertest_1.default)(app)
            .delete(`/accounts/${testAccount._id}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(204);
    });
    it("should admin return 404 for a deleted account", async () => {
        const res = await (0, supertest_1.default)(app)
            .get(`/accounts/${testAccount._id}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(404);
    });
});
afterAll(async () => {
    await user_1.default.deleteMany({});
    await account_2.default.deleteMany({});
});
//# sourceMappingURL=account.test.js.map