import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import { isAuth } from '../utils.js';
const messageRoutes = express.Router();

const ResponderMessage = (message, res) => {
  res.send(message);
};

messageRoutes.post(
  '/send',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const newMesssage = new Message({
      author_id: body.author_id,
      author_profile: body.author_profile,
      author_name: body.author_name,

      reciever_id: body.reciever_id,
      reciever_name: body.reciever_name,
      reciever_profile: body.reciever_profile,

      message: body.message,
      attached_message: body.attached_message,
    });

    const createdMessage = await newMesssage.save();
    ResponderMessage(createdMessage, res);
  })
);

messageRoutes.get(
  '/get/chat',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const query = req.query;

    const messages = await Message.find({
      $or: [
        {
          reciever_id: query.reciever_id,
          author_id: query.author_id,
        },
        {
          reciever_id: query.author_id,
          author_id: query.reciever_id,
        },
      ],
    }).sort({ createdAt: -1 });
    if (messages) {
      res.send(messages);
    }
  })
);

messageRoutes.get(
  '/get/:id/latest',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    const messages = await Message.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: { reciever_id: id },
      },
      {
        $group: {
          _id: { reciever_id: '$reciever_id', author_id: '$author_id' },
          user_data: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: {
          newRoot: '$user_data',
        },
      },
    ]);
    if (messages) {
      res.send(messages);
    }
  })
);

export default messageRoutes;
