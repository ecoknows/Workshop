import mongoose from 'mongoose';

const applicantsSchema = new mongoose.Schema(
  {
    job_id: { type: String, required: true },

    job_name: { type: String, required: true },
    person_of_contact_id: { type: String, required: true },
    applicant_id: { type: String, required: true },

    person_of_contact: { type: String, required: true },
    person_of_contact_profile: { type: String },
    person_of_contact_position: { type: String, required: true },

    applicant_name: { type: String, required: true },
    applicant_name_profile: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Applicants', applicantsSchema);
