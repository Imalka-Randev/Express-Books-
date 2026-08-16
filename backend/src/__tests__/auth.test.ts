import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import User from '../models/User.js';

let mongoServer: MongoMemoryServer;

// 1. Setup Database BEFORE tests start
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// 2. Teardown Database AFTER tests are done
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// 3. Clean Database BEFORE EACH individual test
beforeEach(async () => {
  await User.deleteMany({});
});

// 4. The actual tests
describe('Authentication API', () => {
  
  describe('POST /api/auth/signup', () => {
    it('should create a new user and return a 201 status with a token', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user and return a 200 status with a token', async () => {
      // First, we need to register a user to test logging them in
      await request(app).post('/api/auth/signup').send({
        fullName: 'Login User',
        email: 'login@example.com',
        password: 'password123'
      });

      // Then, we test the login route
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials with a 401 status', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nobody@example.com',
          password: 'wrongpassword'
        });

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Invalid email or password.');
    });
  });
});