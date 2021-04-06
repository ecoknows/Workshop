import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';

import { isAuth } from '../utils.js';
const notificationRoutes = express.Router();

notificationRoutes.get(
  '/seen/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const notifs = await Notification.find({ reciever_id: id, seen: false });
    if (notifs) {
      res.send({ size: notifs.length });
    }
  })
);

notificationRoutes.delete(
  '/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const notify = await Notification.findById(req.params.id);
    if (notify) {
      const deleteNotif = await notify.remove();
      res.send(deleteNotif);
    } else {
      res.status(404).send({ message: 'Notification Not Found' });
    }
  })
);

notificationRoutes.get(
  '/get/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const notifs = await Notification.find({ reciever_id: id });
    if (notifs) {
      res.send(notifs);
    }
  })
);

notificationRoutes.post(
  '/send',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const newNotification = new Notification({
      sender_id: body.sender_id,
      sender_name: body.sender_name,
      sender_profile: body.sender_profile,

      reciever_id: body.reciever_id,

      description: body.description,
      seen: false,
    });

    const createdNotification = await newNotification.save();
    res.send(createdNotification);
  })
);

export default notificationRoutes;
