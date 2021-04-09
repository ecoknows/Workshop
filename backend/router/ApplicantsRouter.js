import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Applicants from '../models/Applicants.js';
import User from '../models/User.js';
import { isAuth } from '../utils.js';
const applicantRoutes = express.Router();

const ResponApplicant = (applicant, res) => {
  res.send({
    _id: applicant._id,
    job_id: applicant.job_id,
    job_name: applicant.job_name,
    person_of_contact_id: applicant.person_of_contact_id,
    applicant_id: applicant.applicant_id,

    person_of_contact: applicant.person_of_contact,
    person_of_contact_position: applicant.person_of_contact_position,
    applicant_name: applicant.applicant_name,
  });
};

applicantRoutes.get(
  '/get/selected',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    if (query._id) {
      const applicant = await User.findOne({ _id: query._id });
      res.send({
        documentation_links: applicant.documentation_links,
        most_skilled: applicant.most_skilled,
        authorized: applicant.authorized,
        resume: applicant.resume.path ? applicant.resume : null,
      });
    }
  })
);

applicantRoutes.get(
  '/get',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    if (query.job_id) {
      const applicant = await Applicants.find({ job_id: query.job_id });
      if (applicant) {
        res.send(applicant);
      }
    } else if (query.person_of_contact_id) {
      const applicant = await Applicants.find({
        person_of_contact_id: query.person_of_contact_id,
      });
      if (applicant) {
        res.send(applicant);
      }
    }
  })
);

applicantRoutes.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const applicant = await Applicants.findOne({
      job_id: body.job_id,
      applicant_id: body.applicant_id,
    });
    if (!applicant) {
      // TODO:
      const newApplicant = new Applicants({
        job_id: body.job_id,
        job_name: body.job_name,
        person_of_contact_id: body.person_of_contact_id,
        applicant_id: body.applicant_id,

        person_of_contact: body.person_of_contact,
        person_of_contact_profile: body.person_of_contact_profile,
        person_of_contact_position: body.person_of_contact_position,

        applicant_name: body.applicant_name,
        applicant_name_profile: body.applicant_name_profile,
      });

      const createdApplicant = await newApplicant.save();
      ResponApplicant(createdApplicant, res);
    } else {
      res.status(401).send({ message: 'You already applied for this Job!' });
    }
  })
);

export default applicantRoutes;
