const app = require("./app.js"); // rexpress app
const request = require("supertest"); // to simulate requests and check responses
it("tests are running", () => {
  request(app)
    .get("/users")
    .expect(200)
    .then((response) => {
      //  console.log(response);
    });
});

// region: test for JWT
describe("Test the JWT Creation", () => {
  //#region test for user successful login
  it("POST /login -> should return correct JWT token", () => {
    let user = {
      username: "user1",
      password: "user1",
    };
    return request(app)
      .post("/login")
      .send(user)
      .expect(200) // sucessful login
      .expect("Content-Type", /json/) // sends json
      .expect((res) => {
        expect(res.body).toHaveProperty("token"); // token is present
      });
  });
  //#endregion

  //#region test for user unsuccessful login
  it("POST /login -> should return 401", () => {
    let user = {
      username: "not a user",
      password: "user1",
    };
    return request(app)
      .post("/login")
      .send(user)
      .expect(401) // sucessful login
      .expect("Content-Type", /json/) // sends json
      .expect((res) => {
        expect(res.body).toHaveProperty("error_message"); // error message is present
      });
  });

  it("POST /login wrong password -> should return 401", () => {
    let user = {
      username: "user1",
      password: "not user 1 password",
    };
    return request(app)
      .post("/login")
      .send(user)
      .expect(401) // sucessful login
      .expect("Content-Type", /json/) // sends json
      .expect((res) => {
        expect(res.body).toHaveProperty("error_message"); // error message is present
      });
  });
  //#endregion
});

describe("Test the JWT Middleware", () => {
    it("GET /tickets unauthorized -> should redirect to /login", () => {
        return request(app)
            .get("/tickets")
            .expect(302) // unauthorized
            .expect("Location", "/login"); // redirect to login
    });
});
// end region: test for JWT
