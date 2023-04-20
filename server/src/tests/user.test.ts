import request from "supertest";
import express from "express";
import authRoutes from "../routes/auth";
import userRoutes from "../routes/user";
import MongoDB from '../services/mongo';
import User from  '../models/user';

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

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

let newUserId: string;

let tokenAdmin: string;
let tokenUser: string;

beforeAll(async() => {
  await MongoDB.init();
  await User.deleteMany();
  await User.create(admin);
  await User.create(user);
});

describe("User C.R.U.D.", () => {

  it("should return a JWT token for valid admin", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(admin);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    tokenAdmin = res.body.token; 
  });

  it("should return a JWT token for valid user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(user);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    tokenUser = res.body.token; 
  });
  
  it("should return 401 for unauthorized access", async () => {
    const res = await request(app)
      .get("/users");

    expect(res.status).toEqual(401);
  });

  it("should return a list of users for authorized admin, must get 2 users(admin and user)", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(2);
  });

  it("should user can not create a new user Forbidden", async () => {
    const res = await request(app)
      .post("/users")
      .send(newUser)
      .set("Authorization", `Bearer ${tokenUser}`);
    
    expect(res.status).toEqual(403);
  });

  it("should admin can create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send(newUser)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    newUser = res.body;
    newUserId = res.body._id;
  });

  it("should return a list of users for authorized admin, must get 3 users(admin, user and user Two)", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(3);
  });

  it("should admin update a user", async () => {
    const updateUser = {
      name: "Updated User Two",
      role: "user",
      email: newUser.email,
    };
    newUser.name = "Updated User Two";
    const res = await request(app)
      .put(`/users/${newUserId}`)
      .send(updateUser)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject(updateUser);
  });

  it("should admin delete a user", async () => {
    const res = await request(app)
      .delete(`/users/${newUserId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(204);
  });

  it("should get user profile", async () => {
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    
    expect(res.status).toEqual(200);
    expect(res.body.name).toBe(admin.name);
    expect(res.body.skills).toBe(admin.skills);
  });


});

afterAll(async() => {
  await User.deleteMany();
});
