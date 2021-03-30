import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    verified: { type: Boolean, required: true},

    email: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    authorized: { type: Number, required: true },

    profile_pic: {type: String},
    is_employer: { type: Boolean},
    most_skilled: { type: [String],},
    birth_day: {type: String, },
    address: {type: String, },
    city: {type: String, },
    sex: {type: String, },

    name_of_document: {type: String},
    documentation_link: {type: String},
    position: {type: String},

    // EMPLOYER
    name_of_business: {type: String},
    address_of_business: {type: String},
    nature_of_business: {type: String},

    // EMPLOYEE
    nature_of_work: {type: String},
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
