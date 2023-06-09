const server = require('../api/server');
const request = require('supertest');

const db = require("../data/db-config");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  
  beforeEach(async () => {
    await db.seed.run();
  });


  test("Sanity cheeck", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });


  const newAdminUser = {
    username: "doctor_house",
    password: "1234",
    email: "doctor@work.com",
    avatar_url:
      "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
  };
  
  describe("__Auth__", () => {
    //describe'de async yok!!!
  
    test("creates a new user", async ()=>{
        const res = await request(server).post('/api/auth/register').send(newAdminUser)

        expect(res.status).toBe(201);
     expect(res.body.message).toBe('Merhaba Erhan');
    
    });

    
  });