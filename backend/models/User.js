import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    is_employer: { type: Boolean, required: true },

    email: { type: String, required: true },
    password: { type: String, required: true },

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    authorized: { type: Number, required: true },

    location: { type: String, required: true },
    most_skilled: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
