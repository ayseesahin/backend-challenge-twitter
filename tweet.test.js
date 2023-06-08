const request = require('supertest');
const server = require('./api/server');
const db = require('./data/db-config');
const userModel = require('./api/users/users-model');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  afterAll(async () => {
    await db.destroy()
  })
  
  test('[0] sanity check', () => {
    expect(true).not.toBe(false)
  })


  describe('server.js', () => {
    describe('[POST] /api/register', () => {
        test('creates a new user', async () => {
            const newUser = {
              username: 'testuser',
              password: 'testpassword',
              email: 'test@example.com',
              avatar_url: 'https://example.com/avatar.png',
            };
          
            const res = await request(server).post('/api/register').send(newUser);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty(message, 'successfully created.');
          
            const insertedUser = await userModel.getByUsername(newUser.username);
            expect(insertedUser).toBeDefined();
            expect(insertedUser.username).toBe(newUser.username);
            expect(insertedUser.email).toBe(newUser.email);
            expect(insertedUser.avatar_url).toBe(newUser.avatar_url);
          });
      });
    
      describe('[POST] /api/login', () => {
        beforeEach(async () => {
          const newUser = {
            username: 'testuser',
            password: 'testpassword',
            email: 'test@example.com',
            avatar_url: 'https://example.com/avatar.png',
          };
          await userModel.create(newUser);
        });
    
        test('logs in an existing user', async () => {
          const credentials = {
            email: 'test@example.com',
            password: 'testpassword',
          };
    
          const res = await request(server).post('/api/login').send(credentials);
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('message', `Welcome back testuser...`);
          expect(res.body).toHaveProperty('token');
        });
    
        test('responds with error for non-existing user', async () => {
          const credentials = {
            email: 'nonexisting@example.com',
            password: 'testpassword',
          };
    
          const res = await request(server).post('/api/login').send(credentials);
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty('message', 'Invalid credentials.');
        });
    
        test('responds with error for incorrect password', async () => {
          const credentials = {
            email: 'test@example.com',
            password: 'incorrectpassword',
          };
    
          const res = await request(server).post('/api/login').send(credentials);
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty('message', 'Invalid credentials.');
        });
      });
    
      describe('[GET] /api/logout', () => {
        beforeEach(async () => {
          const newUser = {
            username: 'testuser',
            password: 'testpassword',
            email: 'test@example.com',
            avatar_url: 'https://example.com/avatar.png',
          };
          await userModel.create(newUser);
        });
    
        test('logs out an authenticated user', async () => {
          const credentials = {
            email: 'test@example.com',
            password: 'testpassword',
          };
    
          const loginRes = await request(server).post('/api/login').send(credentials);
          const token = loginRes.body.token;
    
          const logoutRes = await request(server)
            .get('/api/logout')
            .set('Authorization', `Bearer ${token}`);
    
          expect(logoutRes.status).toBe(200);
          expect(logoutRes.body).toHaveProperty('message', 'Get back soon testuser...');
        });
      })
    })    