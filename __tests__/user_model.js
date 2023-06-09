const User = require('../api/users/users-model');
const db = require("../data/db-config");

const newUser = {
  username: "elon_twitter",
  password: "1234", 
  email: "twitter@work.com",
  avatar_url:
    "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=identicon&r=x",
};



beforeAll(async ()=> {
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeEach(async ()=> {
  await db.seed.run();
})


test('[0] Sanity check', ()=> {
  expect(process.env.NODE_ENV).toBe('testing');
})

test("[1]empty test gets success", () => {});

describe("___Success___", () => {
  

  test("[2]creates user", async () => {
    const user = await User.create(newUser);
    //assertion
    expect(user).toHaveProperty("user_id");
    expect(user.user_id).toBe(3);
    expect(user).toHaveProperty("user_id", 3);
  });


describe("[3]tests for spesific user", () => {
  let user;
  beforeAll(async () => {
    user = await User.getById(2);
  });

  test("[4]gets user by id", async () => {
    const expectedUser = {
      user_id: 2,
      username: "doctor_house",
      password: "1234",
      email: "doctor@work.com",
      avatar_url:
        "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
    }
    expect(user).not.toBe(expectedUser);
    expect(user).toEqual(expectedUser);
    expect(user).toMatchObject({
      user_id: 2,
      username: "doctor_house",
      password: "1234",
    });
  });

  test("[5]checks property values for spesific user", async () => {
    expect(user.username).toMatch(/ct/);
    //   expect(user.username).not.toMatch(/doCtor/);
    //   expect(user.username).toMatch(/doCtor/i);
  })
})

})
