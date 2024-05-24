import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

import "dotenv/config";

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect(process.env.DB_HOST);
  });

  it("response has a status code 200", async () => {
    const res = await supertest(app).post("/users/login").send({
      email: "qwe2@gmail.com",
      password: "123",
    });

    expect(res.statusCode).toBe(200);
  });
});
