import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const userRoutes = express.Router();

const respondSend =(user, res)=>{
    res.send({
        email: user.email,
        password: user.password,
        is_employee: user.is_employee,
        // token: generateToken(user),
    });
}

userRoutes.post('/login',
    expressAsyncHandler(async(req,res)=>{
        const user = await UserModel.findOne({ email: req.body.email });
        console.log(req.body);
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              is_employee: user.is_employee,
            });
            return;
          }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    })
)

userRoutes.post('/register', 
    expressAsyncHandler(async (req,res)=>{
        const user = new UserModel({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: bcrypt.hashSync(req.body.password, 8),
            is_employee: req.body.is_employee,
        });
        const createdUser = await user.save();
        respondSend(createdUser,res);
    })
);;


export default userRoutes;