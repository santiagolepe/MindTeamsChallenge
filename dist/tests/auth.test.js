"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../routes/auth"));
const mongo_1 = __importDefault(require("../services/mongo"));
const user_1 = __importDefault(require("../models/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
let admin = {
    name: 'admin',
    email: 'admin@mind.com',
    password: 'password1@',
    role: 'super_admin'
};
let unregister = {
    name: 'unregister',
    email: 'unregister@mind.com',
    password: 'password1@'
};
let tokenAdmin;
beforeAll(async () => {
    await mongo_1.default.init();
    await user_1.default.deleteMany({});
    let record = new user_1.default(admin);
    await record.save();
});
describe("Authentication", () => {
    it("should return 401 for invalid login", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send({ email: "fake@mind.com", password: "noPassword" });
        expect(res.status).toEqual(401);
    });
    it("should return 401 for missing password", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send({ email: unregister.email });
        expect(res.status).toEqual(401);
    });
    it("should return 401 for missing email", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send({ password: unregister.password });
        expect(res.status).toEqual(401);
    });
    it("should return a JWT token for valid admin", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send(admin);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("token");
        tokenAdmin = res.body.token;
    });
    it("should return 200 logout admin", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/logout")
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
    });
    it("should return 401 for logout without token", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/logout");
        expect(res.status).toEqual(401);
    });
    it("should return 401 for logout with invalid token", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/logout")
            .set("Authorization", "Bearer fake_token");
        expect(res.status).toEqual(401);
    });
});
afterAll(async () => {
    await user_1.default.deleteMany({});
});
//# sourceMappingURL=auth.test.js.map