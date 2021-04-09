import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    worker_id: { type: String, required: true },
    job_id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
