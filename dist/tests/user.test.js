"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../routes/auth"));
const user_1 = __importDefault(require("../routes/user"));
const mongo_1 = __importDefault(require("../services/mongo"));
const user_2 = __importDefault(require("../models/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/users", user_1.default);
let admin = {
    name: 'admin',
    email: 'admin@mind.com',
    password: 'password1@',
    role: 'super_admin',
    skills: 'typescript, javascript, nodeJs, ReactJs',
    englishLevel: 'B2',
    resumeLink: 'https://www.linkedin.com/in/santiagolepe/'
};
let user = {
    name: 'user',
    email: 'user@mind.com',
    password: 'password1@',
    role: 'user'
};
let newUser = {
    name: "user two",
    email: "userTwo@mind.com",
    password: "password1@",
    role: "user"
};
const updateUser = {
    name: "Updated User Two",
    role: "user",
    email: newUser.email,
};
let newUserId;
let tokenAdmin;
let tokenUser;
beforeAll(async () => {
    await mongo_1.default.init();
    let users = await user_2.default.deleteMany({});
    await user_2.default.create(admin);
    await user_2.default.create(user);
});
describe("User C.R.U.D.", () => {
    it("should return a JWT token for valid admin", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send(admin);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("token");
        tokenAdmin = res.body.token;
    });
    it("should return a JWT token for valid user", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/auth/login")
            .send(user);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("token");
        tokenUser = res.body.token;
    });
    it("should return 401 for unauthorized access", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/users");
        expect(res.status).toEqual(401);
    });
    it("should return a list of users for authorized admin, must get 2 users(admin and user)", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/users")
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body).toHaveLength(2);
    });
    it("should user can not create a new user Forbidden", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/users")
            .send(newUser)
            .set("Authorization", `Bearer ${tokenUser}`);
        expect(res.status).toEqual(403);
    });
    it("should admin can create a new user", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/users")
            .send(newUser)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("_id");
        newUser = res.body;
        newUserId = res.body._id;
    });
    it("should return a list of users for authorized admin, must get 3 users(admin, user and user Two)", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/users")
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body).toHaveLength(3);
    });
    it("should admin update a user", async () => {
        const res = await (0, supertest_1.default)(app)
            .put(`/users/${newUserId}`)
            .send(updateUser)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(updateUser);
    });
    it("should admin get a new user info", async () => {
        const res = await (0, supertest_1.default)(app)
            .get(`/users/${newUserId}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(updateUser);
    });
    it("should admin delete a user", async () => {
        const res = await (0, supertest_1.default)(app)
            .delete(`/users/${newUserId}`)
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(204);
    });
    it("should get user profile", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toBe(admin.name);
        expect(res.body.skills).toBe(admin.skills);
    });
    it("should get user profile", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${tokenAdmin}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toBe(admin.name);
        expect(res.body.skills).toBe(admin.skills);
    });
});
afterAll(async () => {
    await user_2.default.deleteMany({});
});
//# sourceMappingURL=user.test.js.map