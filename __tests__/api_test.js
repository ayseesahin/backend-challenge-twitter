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


  const newUser = {
    username: "doctor_house",
    password: "1234",
    email: "doctor@work.com",
    avatar_url:
      "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x",
  };
  
  describe('___AUTH____', ()=> {   //!describe'da async yok!!!


    test('create a new user', async ()=> {

        const res = await request(server).post('/api/auth/register').send(newUser);
        const user = await db('users').where({
          username: "doctor_house"}).first();
        //assertion
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully created');
        expect(res.body.message.includes(user.username)).toBe(true);

    })

    test('new user can login', async ()=> {

        await request(server).post('/api/auth/register').send(newUser);
        const res = await request(server).post('/api/auth/login').send(newUser);
        //assertion
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();

    })

    test('user can logout', async ()=> {

        await request(server).post('/api/auth/register').send(newUser);
        const res = await request(server).post('/api/auth/login').send(newUser);
        const token = res.body.token;

        await request(server).get('/api/auth/logout').set('Authorization', token);
        const res2 = await request(server).get('/api/users').set('Authorization', token);
        //assertion
        expect(res2.status).toBe(403);

    })


    
})


// describe('___USERS____', ()=> {   //!describe'da async yok!!!
//     let token;
//     beforeEach(async ()=> {
//         await request(server).post('/api/auth/register').send(newUser);
//         const res = await request(server).post('/api/auth/login').send(newUser);
//         token = res.body.token;
//     })

//     test('create a new user', async ()=> {

//         const res = await request(server).get('/api/users').set('Authorization', token);
//         //assertion
//         expect(res.body).toHaveLength(2);

//     })

    
// })