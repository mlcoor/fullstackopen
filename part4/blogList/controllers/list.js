import Blog from '../models/list.js';
import { Router } from 'express';

const blogRouter = Router();
blogRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(201).json(result);
  });
});

export default blogRouter;
