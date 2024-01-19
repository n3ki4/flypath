import request, { Response } from "supertest";
import assert from "assert";
import { Sequelize } from "sequelize";

import app from "./app";

const userTest = {
  email: "test777@gmail.com",
  password: "12345",
};

describe("Access to DB", () => {
  describe("check", () => {
    it("should return -1 because wrong credentials", (done) => {
      const mysqlConnection = new Sequelize(
        process.env.DB_DATABASE || "no-name-provided",
        process.env.DB_USER || "no-user-provided",
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: "mysql",
        }
      );
      mysqlConnection.authenticate().then(() => done());
    });
  });
});

describe("starterPack", () => {
  let token: string = "no-token";

  beforeEach((done) => {
    request(app)
      .post("/auth/login")
      .send({
        email: userTest.email,
        password: userTest.password,
      })
      .end((err: Error, response: Response) => {
        token = response.body.data.token; // save the token!
        done();
      });
  });

  it("Hello test", (done) => {
    request(app)
      .get("/start")
      .set("x-access-token", token)
      .expect("<h2>Hello Express</h2>")
      .end(done);
  });

  it("Return error with status 404", (done) => {
    request(app).get("/error").expect(404).expect("NotFound").end(done);
  });

  it("Send user info", (done) => {
    request(app)
      .get("/user")
      .expect((response: Response) => {
        assert.deepEqual(response.body, {
          name: "Tom",
          age: 22,
        });
      })
      .end(done);
  });
});
