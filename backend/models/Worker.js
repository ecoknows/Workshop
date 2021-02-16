import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    is_employee: {type:Boolean, required: true},

    email: {type: String, required: true},
    password: {type: String, required: true},

    firstname: {type: String, required: true},
    lastname: {type: String, required: true},

    rate: {type: Number, required: true},

    location:{type: String, required: true},
    most_skilled:{type: String, required: true},
    status:{type: Boolean, required: true},
    
},{timestamps: true})


export default mongoose.model('Worker', workerSchema);