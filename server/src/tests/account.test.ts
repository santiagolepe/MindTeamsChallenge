import request from "supertest";
import express from "express";
import authRoutes from "../routes/auth";
import accountRoutes from "../routes/account";
import MongoDB from '../services/mongo';
import User from  '../models/user';
import Account from  '../models/account';
import { users } from "./helper";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);

let tokenAdmin: string;
let userId: string;
let testAccount: any;

beforeAll(async() => {
  await MongoDB.init();
  await User.deleteMany({});
  await Account.deleteMany({});
  await User.create(users.admin);
  let user = await User.create(users.user);
  userId = user._id;
});

describe("Account C.R.U.D.", () => {

  it("get admin token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(users.admin);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    tokenAdmin = res.body.token; 
  });

  it("should return 401 for unauthorized access", async () => {
    const res = await request(app)
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

    const res = await request(app)
      .post("/accounts")
      .send(newAccount)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toEqual(201);
    expect(res.body.client).toBe(newAccount.client);
    expect(res.body.responsible._id).toBe(String(userId));
    testAccount = res.body;
  });

  it("should admin return a list of accounts", async () => {
    const res = await request(app)
      .get("/accounts")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(1);
  });

  it("should admin get account by ID", async () => {
    const res = await request(app)
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

    const res = await request(app)
      .put(`/accounts/${testAccount._id}`)
      .send(testAccount)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name", testAccount.name);
    expect(res.body).toHaveProperty("client", testAccount.client);
  });

  it("should admin remove a user from the account's team", async () => {
    const res = await request(app)
      .patch(`/accounts/${testAccount._id}/remove-user/${userId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toEqual(200);
    expect(res.body.team).not.toContainEqual(userId);
  });

  it("should admin add a user to the account's team", async () => {
    const res = await request(app)
      .patch(`/accounts/${testAccount._id}/add-user/${userId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(res.body.team).toHaveLength(1);
    expect(res.body.team).toContainEqual(String(userId));
  });

  it("should admin delete an account", async () => {
    const res = await request(app)
      .delete(`/accounts/${testAccount._id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(204);
  });

  it("should admin return 404 for a deleted account", async () => {
    const res = await request(app)
      .get(`/accounts/${testAccount._id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
   
    expect(res.status).toEqual(404);
  });

});

afterAll(async() => {
  await User.deleteMany({});
  await Account.deleteMany({});
});
