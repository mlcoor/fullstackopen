import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';

const api = supertest(app);

test('blogs return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the identifier of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test(' POST /api/blogs to creates a new blog post', async () => []);

afterAll(async () => await mongoose.connection.close());
