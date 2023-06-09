const User = require('../api/users/users-model');
const db = require("../data/db-config");

const newUser = {
  username: "apple_back",
  password: "$2a$10$l.bP2RQgng16HnJA3DPdxuvjfJxlDVWVw8XO9f8sTtrcNUl4DQ5k6", //1234
  email: "apple@work.com",
  avatar_url:
    "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=identicon&r=x",
};

const newUser2 = {
  username: "doctor_house",
  password: "1234",
  email: "doctor@work.com",
  avatar_url:
    "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
};

beforeAll(async ()=> {
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeEach(async ()=> {
  await db.seed.run();
})


test('Sanity check', ()=> {
  expect(process.env.NODE_ENV).toBe('testing');
})

test("empty test gets success", () => {});

describe("SUCCESS TESTLERİ", () => {
  //describe'de async yok!!!

  test("creates user", async () => {
    const user = await User.create(newUser);
    //assertion
    expect(user).toHaveProperty("id");
    expect(user.id).toBe(1);
    expect(user).toHaveProperty("id", 1);
  });


describe("tests for spesific user", () => {
  let user;
  beforeAll(async () => {
    user = await User.getById(2);
  });

  test("gets user by id", async () => {
    const expectedUser = {
      id: 2,
      username: "doctor_house",
      password: "1234",
      email: "doctor@work.com",
      avatar_url:
        "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
    }
    expect(user).not.toBe(expectedUser);
    expect(user).toEqual(expectedUser);
    expect(user).toMatchObject({
      id: 2,
      username: "doctor_house",
      password: "1234",
    });
  });

  test("checks property values for spesific user", async () => {
    expect(user.username).toMatch(/ct/);
    //   expect(user.username).not.toMatch(/doCtor/);
    //   expect(user.username).toMatch(/doCtor/i);
  })
})

})
