import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Jobs from '../models/Jobs.js';
import bcrypt from 'bcryptjs';
import { isAuth } from '../utils.js';

const jobRoutes = express.Router();

const respondSend = (user, res) => {
  res.send({
    employer: user.employer,
    job: user.job,
    current_workers: user.current_workers,
    max_workers: user.max_workers,
    description: user.description,
    icons: user.icons,
  });
};

jobRoutes.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const job = new Jobs({
      employer: req.body.employer,
      job: req.body.job,
      current_workers: req.body.current_workers,
      current_applicants: req.body.current_applicants,
      max_workers: req.body.max_workers,
      description: req.body.description,
      icons: req.body.icons,
    });
    const createdJob = await job.save();
    if(createdJob){
      res.status(201).send({message: 'Job Successfully Added', job : createdJob});
    }
  })
);

jobRoutes.get(
  '/list',
  expressAsyncHandler(async (req, res) => {
    const job = await Jobs.find({ employer: req.query.employer });
    res.send(job);
  })
);

export default jobRoutes;
