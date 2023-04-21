import request from "supertest";
import express from "express";
import authRoutes from "../routes/auth";
import MongoDB from '../services/mongo';
import User from  '../models/user';
import { sleep } from "./helper";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

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
}

let tokenAdmin: string;

beforeAll(async() => {
  await MongoDB.init();
  await User.deleteMany({});
  let record = new User(admin);
  await record.save()
});

describe("Authentication", () => {
  
  it("should return 401 for invalid login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "fake@mind.com", password: "noPassword" });
    
    expect(res.status).toEqual(401);
  });

  it("should return 401 for missing password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: unregister.email });

    expect(res.status).toEqual(401);
  });

  it("should return 401 for missing email", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ password: unregister.password });
    
    expect(res.status).toEqual(401);
  });

  it("should return a JWT token for valid admin", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(admin);

      expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    tokenAdmin = res.body.token;
  });

  it("should return 200 logout admin", async () => {
    const res = await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toEqual(200);
  });

  it("should return 401 for logout without token", async () => {
    const res = await request(app)
      .post("/auth/logout");
    
    expect(res.status).toEqual(401);
  });

  it("should return 401 for logout with invalid token", async () => {
    const res = await request(app)
      .post("/auth/logout")
      .set("Authorization", "Bearer fake_token");
    
    expect(res.status).toEqual(401);
  });

});

afterAll(async() => {
  await User.deleteMany({});
});
