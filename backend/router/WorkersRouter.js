import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Workers from '../models/Workers.js';
import User from '../models/User.js';
import { isAuth } from '../utils.js';
import Applicants from '../models/Applicants.js';
import Task from '../models/Task.js';
import Jobs from '../models/Jobs.js';
const workerRoutes = express.Router();

const ResponWorker = (worker, res) => {
  res.send({
    _id: worker._id,
    job_id: worker.job_id,
    job_name: worker.job_name,
    person_of_contact_id: worker.person_of_contact_id,
    worker_id: worker.worker_id,

    person_of_contact: worker.person_of_contact,
    person_of_contact_position: worker.person_of_contact_position,
    worker_name: worker.worker_name,
    worker_name_profile: worker.worker_name_profile,
  });
};

workerRoutes.get(
  '/get',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    if (query.job_id) {
      const workers = await Workers.find({ job_id: query.job_id });
      if (workers) {
        res.send(workers);
      }
    } else if (query.person_of_contact_id) {
      const workers = await Workers.find({
        person_of_contact_id: query.person_of_contact_id,
      });
      if (workers) {
        res.send(workers);
      }
    } else if (query.worker_id) {
      const workers = await Workers.find({
        worker_id: query.worker_id,
      });
      if (workers) {
        res.send(workers);
      }
    }
  })
);

workerRoutes.delete(
  '/fire/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const params = req.params;
    const worker = await Workers.findById(params.id);
    const job = await Jobs.findById(worker.job_id);
    if (worker) {
      await Task.deleteMany({
        worker_id: worker.worker_id,
        job_id: worker.job_id,
      });
      job.current_workers -= 1;
      const workerRemove = await worker.remove();
      if (workerRemove) {
        res.send(workerRemove);
      }
      await job.save();
    }
  })
);

workerRoutes.get(
  '/:id/add',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const applicant = await Applicants.findOne({ applicant_id: id });
    if (applicant) {
      const worker = new Workers({
        job_id: applicant.job_id,
        job_name: applicant.job_name,
        person_of_contact_id: applicant.person_of_contact_id,
        worker_id: applicant.applicant_id,

        person_of_contact: applicant.person_of_contact,
        person_of_contact_profile: applicant.person_of_contact_profile,
        person_of_contact_position: applicant.person_of_contact_position,
        worker_name: applicant.applicant_name,
        worker_name_profile: applicant.applicant_name_profile,
      });

      const createdWorker = await worker.save();
      ResponWorker(createdWorker, res);
      applicant.remove();
    }
  })
);

workerRoutes.put(
  '/:id/progress',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const worker = await Workers.findById(id);
    if (worker) {
      worker.progress = body.progress;
      const updateWorker = await worker.save();
      res.send(updateWorker);
    }
  })
);
export default workerRoutes;
