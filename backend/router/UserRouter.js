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

    firstname: user.firstname,
    lastname: user.lastname,

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

          firstname: user.firstname,
          lastname: user.lastname,

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
    const employee = new User({
      is_employer: false,

      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),

      firstname: req.body.firstname,
      lastname: req.body.lastname,

      authorized: NEW,

      location: req.body.location,
      most_skilled: req.body.most_skilled,
    });
    const createdEmployee = await employee.save();
    respondSend(createdEmployee, res);
  })
);

export default userRouter;
