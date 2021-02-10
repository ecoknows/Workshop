import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    is_employee: {type:Boolean, required: true},
},{timestamps: true})

export default mongoose.model('User', userSchema);