import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema(
  {
    employer_id: { type: String, required: true },
    employer_full_name: { type: String, required: true },
    employer_profile: { type: String, required: true },

    job: { type: String, required: true },

    current_workers: { type: Number, required: true },
    max_workers: { type: Number, required: true },
    description: { type: String, required: true },

    current_applicants: { type: Number, required: true },

    icons: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Jobs', jobsSchema);
