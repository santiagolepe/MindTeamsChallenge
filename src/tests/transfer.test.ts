import request from "supertest";
import express from "express";
import authRoutes from "../routes/auth";
import transferRoutes from "../routes/transfer";
import MongoDB from '../services/mongo';
import User from  '../models/user';
import Account from  '../models/account';
import Transfer from  '../models/transfer';
import { users } from "./helper";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/transfers", transferRoutes);

let tokenAdmin: string;
let userId: string;
let user: any;
let account: any;
let started_at = new Date();
started_at.setDate(started_at.getDate() - 1);
let ended_at = new Date();

beforeAll(async() => {
  await MongoDB.init();
  await User.deleteMany({});
  await Account.deleteMany({});
  await Transfer.deleteMany({});
  await User.create(users.admin);
  user = await User.create(users.user);
  userId = user._id;

  account = await Account.create({
    name: "Test Account",
    client: "Test Client",
    responsible: userId,
    team: [userId],
  });
});

describe("Transfer Log filter", () => {

  it("get admin token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(users.admin);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    tokenAdmin = res.body.token; 
  });

  it("should return 401 for unauthorized users", async () => {
    const res = await request(app)
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

    const res = await request(app)
      .get("/transfers")
      .query(filter)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(1);
  });

});

afterAll(async() => {
  await User.deleteMany({});
  await Account.deleteMany({});
  await Transfer.deleteMany({});
});
