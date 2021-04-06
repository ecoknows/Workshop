import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    author_id: { type: String, required: true },
    author_profile: { type: String, required: true },
    author_name: { type: String, required: true },

    reciever_id: { type: String, required: true },
    reciever_name: { type: String, required: true },
    reciever_profile: { type: String, required: true },
    message: { type: String, required: true },
    attached_message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
