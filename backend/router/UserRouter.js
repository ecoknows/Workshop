import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { NEW } from '../api/api_constants.js';

const userRouter = express.Router();
const respondSend = (user, res) => {
  res.send({
    is_employee: true,

    email: user.email,
    password: bcrypt.hashSync(user.password, 8),

    full_name: user.full_name,

    authorized: NEW,

    location: user.location,
    most_skilled: user.most_skilled,
  });
};

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          is_employer: false,

          email: user.email,
          password: bcrypt.hashSync(user.password, 8),

          full_name: user.full_name,

          authorized: NEW,

          location: user.location,
          most_skilled: user.most_skilled,
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = User.find({email: body.email})
    console.log(user);

    if(!user){
      const employee = new User({
        is_employer: false,
        email: body.email,
        password: bcrypt.hashSync(body.password, 8),
        full_name: body.full_name,
        authorized: NEW,
      });
      const createdEmployee = await employee.save();
      respondSend(createdEmployee, res);
    }else{
      res.status(401).send({ message: 'Email already exist!' });
    }
  })
);


userRouter.post(
  '/register/account',
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    const body = req.body;
    const user = await User.findOne({ _id : query.id });

    if(user){
      
      user.most_skilled = body.most_skilled;
      user.birth_day = body.birth_day;
      user.address = body.address;
      user.city = body.city;
      user.sex = body.sex;
      user.status = body.status; 
      user.name_of_document = body.name_of_document;
      user.documentation_link = body.documentation_link;
      user.position = body.position;

      if(user.is_employer){
        user.name_of_business = body.name_of_business;
        user.address_of_business = body.address_of_business;
        user.nature_of_business = body.nature_of_business;
      }else{
        nature_of_work = body.nature_of_work;
      }

    }else{
      res.status(401).send({ message: 'Cannot find account' });
    }
  })
);

export default userRouter;
