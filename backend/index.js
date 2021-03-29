import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './router/UserRouter.js';
import JobsRouter from './router/JobsRouter.js';
import UploadRouter from './router/UploadRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);
app.use('/api/jobs', JobsRouter);
app.use('/api/uploads', UploadRouter);

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Database connected');
  }
);

app.listen(PORT, () => {
  console.log(`Camry Server is Running at ${PORT}`);
});
