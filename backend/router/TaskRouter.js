import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import { isAuth } from '../utils.js';

const taskRoutes = express.Router();

taskRoutes.post(
  '/add',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const task = new Task({
      worker_id: body.worker_id,
      job_id: body.job_id,
      name: body.name,
      status: body.status,
    });

    const createdTask = await task.save();
    res.send(createdTask);
  })
);

taskRoutes.get(
  '/:id/status',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task.status == 2) {
      task.status = 0;
    } else {
      task.status += 1;
    }
    const createdTask = await task.save();
    res.send({ status: createdTask.status });
  })
);

taskRoutes.get(
  '/all',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    const tasks = await Task.find({
      job_id: query.job_id,
      worker_id: query.worker_id,
    });
    if (tasks) {
      res.send(tasks);
    }
  })
);

export default taskRoutes;
