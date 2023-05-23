import request from "supertest";
import jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import app from "../index";

const baseUrl = '/api/v1';

describe("User API", () => {
  let token: string;
  beforeAll(async () => {
    // Create a test user
    const testUser = new User({
      firstName: 'testuser',
      lastName: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      role: 'Admin'
    });
    await testUser.save();

    // Generate a JWT token for the test user
    token = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET || 'secret');
  });


  afterAll(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /users/signup", () => {
    it("should signup a new user", async () => {
      const res = await request(app)
        .post(`${baseUrl}/users/signup`)
        .send({ firstName: "John", lastName: "Doe", password: "1234", email: "john.doe@example.com", role: 'Admin' });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty("_id");
      expect(res.body.data).toHaveProperty("firstName", "John");
      expect(res.body.data).toHaveProperty("lastName", "Doe");
      expect(res.body.data).toHaveProperty("email", "john.doe@example.com");
    });
  });

  describe("GET /users", () => {
    it("should return an empty array when there are no users", async () => {
      const res = await request(app)
      .get(`${baseUrl}/users`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it("should return an array of users when there are users", async () => {
      await User.create({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password" });
      const res = await request(app)
      .get(`${baseUrl}/users`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0]).toHaveProperty("firstName", "John");
      expect(res.body[0]).toHaveProperty("lastName", "Doe");
      expect(res.body[0]).toHaveProperty("email", "john.doe@example.com");
    });
  });

  describe("GET /users/:id", () => {
    it("should return 404 when user not found", async () => {
      const res = await request(app)
      .get(`${baseUrl}/users/642bfa577583f34e7cc50b18`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(404);
    });

    it("should return the user when user found", async () => {
      const user = await User.create({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password" });
      const res = await request(app)
      .get(`${baseUrl}/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("firstName", "John");
      expect(res.body).toHaveProperty("lastName", "Doe");
      expect(res.body).toHaveProperty("email", "john.doe@example.com");
    });
  });
  describe("PUT /users/:id", () => {
    it("should return 404 when user not found", async () => {
      const res = await request(app)
        .put(`${baseUrl}/users/642bfa577583f34e7cc50b18`)
        .set('Authorization', `Bearer ${token}`)
        .send({ firstName: "John", lastName: "Doe", email: "john.doe@example.com" });
      expect(res.statusCode).toEqual(404);
    });

    it("should update the user when user found", async () => {
      const user = await User.create({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password" });
      const res = await request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ firstName: "John", lastName: "Doe", email: "john.doe@example.com" });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("firstName", "John");
      expect(res.body).toHaveProperty("lastName", "Doe");
      expect(res.body).toHaveProperty("email", "john.doe@example.com");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should return 404 when user not found", async () => {
      const res = await request(app)
      .delete("/users/642bfa577583f34e7cc50b18")
      .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(404);
    });

    it("should delete the user when user found", async () => {
      const user = await User.create({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password" });
      const res = await request(app)
      .delete(`${baseUrl}/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(204);
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });
  });
});