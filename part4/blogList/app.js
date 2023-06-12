import mongoose from 'mongoose';
import config from './utils/config.js';
import logger from './utils/logger.js';
import express from 'express';
import cors from 'cors';
import blogRouter from './controllers/list.js';
import middleware from './utils/middleware.js';

const app = express();

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message));

app.use(cors());
// app.use(express.static('build'))
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
