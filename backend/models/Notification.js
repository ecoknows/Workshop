import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    sender_id: { type: String, required: true },
    sender_name: { type: String, required: true },
    sender_profile: { type: String, required: true },

    reciever_id: { type: String, required: true },

    description: { type: String, required: true },
    seen: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
