const app = require("./app.js"); // rexpress app
const request = require("supertest"); // to simulate requests and check responses
it("tests are running", () => {
  request(app)
    .get("/users")
    .expect(200)
    .then((response) => {
      console.log(response);
    });
});

//#region JWT Token
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
//#endregion JWT Token

//#region User Tickets
describe("Test the User Tickets", () => {
  // Initialize vaiables
  let user1_token = "";
  // before all tests start, login
  beforeAll(async () => {
    let user = {
      username: "user1",
      password: "user1",
    };
    return request(app)
      .post("/login")
      .send(user)
      .expect(200) // sucessful login;
      .expect("Content-Type", /json/) // sends json
      .expect((res) => {
        expect(res.body).toHaveProperty("token"); // token is present
      })
      .then((response) => {
        user1_token = response.body.token;
      });
  });

  console.log(user1_token);
  //#region test for user successful login
  let users = [
    {
      username: "user1",
      password: "user1",
    },
    {
      username: "user2",
      password: "user2",
    },
  ];
  let user1 = users[0];
  let user2 = users[1];

  it("GET /tickets -> should return user1 tickets", () => {
    return request(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${user1_token}`)
      .expect(200) // sucessful login
      .expect("Content-Type", /json/) // sends json

      .expect((res) => {
        expect(res.body).toHaveProperty("tickets"); // tickets are present
        expect(res.body.tickets).toHaveLength(2); // tickets are present
        // make sure they are the same tickets as above
        expect(res.body.tickets[0]).toHaveProperty("id", 1);
        expect(res.body.tickets[0]).toHaveProperty("title", "user1 ticket 1");
        expect(res.body.tickets[1]).toHaveProperty("id", 2);
        expect(res.body.tickets[1]).toHaveProperty("title", "user1 ticket 2");
      });
  });
});

//#endregion User Tickets
