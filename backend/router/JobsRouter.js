import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Jobs from '../models/Jobs.js';
import bcrypt from 'bcryptjs';
import { isAuth } from '../utils.js';

const jobRoutes = express.Router();

const RespondSend = (user, res) => {
  res.send({
    _id: user._id,
    employer_id: user.employer_id,
    employer_full_name: user.employer_full_name,
    employer_profile: user.employer_profile,
    job: user.job,
    current_workers: user.current_workers,
    current_applicants: user.current_applicants,
    max_workers: user.max_workers,
    description: user.description,
    icons: user.icons,
  });
};

jobRoutes.get(
  '/current_applicants',
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    const job = await Jobs.findOne({ _id: query._id });
    if (query.status == 'new') {
      job.current_applicants = job.current_applicants + 1;
    } else if (query.status == 'remove') {
      job.current_applicants = job.current_applicants - 1;
    }
    const updatedJob = await job.save();
    RespondSend(updatedJob, res);
  })
);

jobRoutes.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const job = new Jobs({
      employer_id: req.body.employer_id,
      employer_full_name: req.body.employer_full_name,
      employer_profile: req.body.employer_profile,
      job: req.body.job,
      current_workers: req.body.current_workers,
      current_applicants: req.body.current_applicants,
      max_workers: req.body.max_workers,
      description: req.body.description,
      icons: req.body.icons,
    });
    const createdJob = await job.save();
    if (createdJob) {
      res
        .status(201)
        .send({ message: 'Job Successfully Added', job: createdJob });
    }
  })
);

jobRoutes.get(
  '/list',
  expressAsyncHandler(async (req, res) => {
    const query = req.query;

    if (query.all) {
      const job = await Jobs.find({});
      res.send(job);
    } else {
      const job = await Jobs.find({ employer_id: query.employer_id });
      res.send(job);
    }
  })
);

export default jobRoutes;
