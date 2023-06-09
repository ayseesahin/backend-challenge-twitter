const server = require("../api/server");
const request = require("supertest");
const userModel = require('../api/users/users-model');
const tweetsModel = require('../api/tweets/tweets-model');
const db = require("../data/db-config");



beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("[6]Sanity cheeck", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

const newUser = {
  username: "doctor_swan",
  password: "12345",
  email: "doctor@swan.com",
  avatar_url:
    "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
};

const newUser2 = {
  username: "doctor",
  password: "12345",
  email: "doctor@who.com",
  avatar_url:
    "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
};


describe("___AUTH____", () => {
  test("[7]create a new user", async () => {
    const res = await request(server).post("/api/auth/register").send(newUser);
    const user = await db("users")
      .where({
        username: "doctor_swan",
      })
      .first();

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User successfully created.");
    expect(res.body.insertedUser.username).toBe(user.username);
  });

  test("[8]new user can login", async () => {
    await request(server).post("/api/auth/register").send(newUser);
    const res = await request(server).post("/api/auth/login").send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("[9]user can logout", async () => {
    await request(server).post("/api/auth/register").send(newUser);
    const res = await request(server).post("/api/auth/login").send(newUser);
    const token = res.body.token;

    await request(server).get("/api/auth/logout").set("Authorization", token);
    const res2 = await request(server)
      .get("/api/users")
      .set("Authorization", token);

    expect(res2.status).toBe(200);
  });
});

describe("___USERS____", () => {
  let token;
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send(newUser);
    const res = await request(server).post("/api/auth/login").send(newUser);
    token = res.body.token;

    
  });

  test("[10] create a new user", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Authorization", token);

    expect(res.body).toHaveLength(3);
  });

  test("[11] should return user with specified id", async () => {
    const insertedUser = await userModel.create(newUser2);
    const userId = insertedUser.user_id;
    const res = await request(server)
      .get(`/api/users/${userId}`) 
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe(newUser2.username);
    expect(res.body.email).toBe(newUser2.email);
    expect(res.body.avatar_url).toBe(newUser2.avatar_url);
  });

  test("[12] should delete user with specified id", async () => {
    const insertedUser = await userModel.create(newUser2);
    const userId = insertedUser.user_id;
  
    const res = await request(server)
      .delete(`/api/users/${userId}`)
      .set("Authorization", token);
  
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`${userId}'li kullanıcı silindi.`);
  
    const deletedUser = await userModel.getById(userId);
    expect(deletedUser).toBeUndefined();
  });
  
  test("[13] should return 404 if user with specified id does not exist", async () => {
    const res = await request(server)
      .delete(`/api/users/999`)
      .set("Authorization", token);
  
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("999 id'li kullanıcı bulunamadı!...");
  });
  
});


describe("___USERS____", () => {
  let token;
  

  beforeEach(async () => {

    await request(server).post("/api/auth/register").send(newUser);
    const res = await request(server).post("/api/auth/login").send(newUser);
    token = res.body.token;
  
    
  });
  

  test("[14] should get all tweets", async () => {
    
    const res = await request(server).get("/api/tweets").set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);

    expect(res.body[0].content).toBe("Hello, I' am Elma!...");
    expect(res.body[0].user_id).toBe(1);

    expect(res.body[1].content).toBe("Hello patients :)");
    expect(res.body[1].user_id).toBe(2);


  });

  test("[15] should return tweets by user_id", async () => {
    const userId = 1; // İstenilen user_id değerini burada belirtin

    const response = await request(server).get(`/api/tweets/${userId}`).set("Authorization", token);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Diğer beklentileri buraya ekleyebilirsiniz
  });
  
});