import mongoose from 'mongoose';

const workersSchema = new mongoose.Schema(
  {
    job_id: { type: String, required: true },

    job_name: { type: String, required: true },
    person_of_contact_id: { type: String, required: true },
    worker_id: { type: String, required: true },

    person_of_contact: { type: String, required: true },
    person_of_contact_profile: { type: String },
    person_of_contact_position: { type: String, required: true },

    worker_name: { type: String, required: true },
    worker_name_profile: { type: String },
    progress: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Workers', workersSchema);
