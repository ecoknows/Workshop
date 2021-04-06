import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './router/UserRouter.js';
import JobsRouter from './router/JobsRouter.js';
import UploadRouter from './router/UploadRouter.js';
import ApplicantsRouter from './router/ApplicantsRouter.js';
import MessageRouter from './router/MessageRouter.js';
import NotificationRouter from './router/NotificationRouter.js';
import path from 'path';
import { Server } from 'socket.io';
import Notification from './models/Notification.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);
app.use('/api/jobs', JobsRouter);
app.use('/api/applicants', ApplicantsRouter);
app.use('/api/messages', MessageRouter);
app.use('/api/uploads', UploadRouter);
app.use('/api/notification', NotificationRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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

const server = app.listen(PORT, () => {
  console.log(`Camry Server is Running at ${PORT}`);
});

const io = new Server(server, {});
io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on('message', (data) => {
    io.in(roomId).emit('message', data);
  });

  socket.on('notification', async (data) => {
    const notifs = await Notification.find({
      reciever_id: data.reciever_id,
      seen: false,
    });
    console.log(notifs);
    io.in(roomId).emit(data.reciever_id, { notify_size: notifs.length });
  });

  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
});
