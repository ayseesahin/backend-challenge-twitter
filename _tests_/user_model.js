const User = require("../api/users/users-model");
const db = require("../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

/*
testleri grupla
beforeAll, beforeEach, afterAll, afterEach

test.toDo('Açıklama');
test.only('test 1', ()=>{...});
test.skip('test 2', ()=>{...});


.todo .only .skip birden fazla kullanılabilir
*/

test("Sanity cheeck", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

test("empty test gets success", () => {});

describe("SUCCESS TESTLERİ", () => {
  //describe'de async yok!!!

  test("creates user");
});


describe("SUCCESS TESTLERİ", () => {
let user;
beforeAll(async () => {
  user=  await User.getById(2);
})

test("gets user by id", async () => {
  const user = await User.getById(2);
  const expectedUser = {
    username: "doctor_house",
    password: "1234",
    email: "doctor@work.com",
    avatar_url:
      "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
  };

  expect(user).not.toBe(expectedUser);
  expect(user).toEqual(expectedUser);
});

test("checks property values for spesific user", async () => {
  const user = await User.getById(2);

  expect(user.username).toMatch(/doctor/);
  //   expect(user.username).not.toMatch(/doCtor/);
  //   expect(user.username).toMatch(/doCtor/i);
})
})
