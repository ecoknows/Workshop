import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { NEW } from '../api/api_constants.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

const RespondEmployer = (res, createdUser) => {
  res.send({
    _id: createdUser._id,
    verified: createdUser.verified,

    email: createdUser.email,
    full_name: createdUser.full_name,
    authorized: createdUser.authorized,

    profile_pic: createdUser.profile_pic,
    is_employer: createdUser.is_employer,
    birth_day: createdUser.birth_day,
    address: createdUser.address,
    city: createdUser.city,
    sex: createdUser.sex,
    most_skilled: createdUser.most_skilled,

    documentation_links: createdUser.documentation_links,
    position: createdUser.position,

    name_of_business: createdUser.name_of_business,
    address_of_business: createdUser.address_of_business,
    nature_of_business: createdUser.nature_of_business,
  });
};

const RespondEmployerWithToken = (res, createdUser) => {
  res.send({
    _id: createdUser._id,
    verified: createdUser.verified,

    email: createdUser.email,
    full_name: createdUser.full_name,
    authorized: createdUser.authorized,

    profile_pic: createdUser.profile_pic,
    is_employer: createdUser.is_employer,
    birth_day: createdUser.birth_day,
    address: createdUser.address,
    city: createdUser.city,
    sex: createdUser.sex,
    most_skilled: createdUser.most_skilled,

    documentation_links: createdUser.documentation_links,
    position: createdUser.position,

    name_of_business: createdUser.name_of_business,
    address_of_business: createdUser.address_of_business,
    nature_of_business: createdUser.nature_of_business,

    token: generateToken(createdUser),
  });
};

const RespondWorker = (res, createdUser) => {
  res.send({
    _id: createdUser._id,
    verified: createdUser.verified,

    email: createdUser.email,
    full_name: createdUser.full_name,
    authorized: createdUser.authorized,

    profile_pic: createdUser.profile_pic,
    is_employer: createdUser.is_employer,
    birth_day: createdUser.birth_day,
    address: createdUser.address,
    city: createdUser.city,
    sex: createdUser.sex,
    most_skilled: createdUser.most_skilled,

    documentation_links: createdUser.documentation_links,
    position: createdUser.position,

    nature_of_work: createdUser.nature_of_work,
  });
};

const RespondWorkerWithToken = (res, createdUser) => {
  res.send({
    _id: createdUser._id,
    verified: createdUser.verified,

    email: createdUser.email,
    full_name: createdUser.full_name,
    authorized: createdUser.authorized,

    profile_pic: createdUser.profile_pic,
    is_employer: createdUser.is_employer,
    birth_day: createdUser.birth_day,
    address: createdUser.address,
    city: createdUser.city,
    sex: createdUser.sex,
    most_skilled: createdUser.most_skilled,

    documentation_links: createdUser.documentation_links,
    position: createdUser.position,

    nature_of_work: createdUser.nature_of_work,

    token: generateToken(createdUser),
  });
};
userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (!user.verified) {
          res.send({
            _id: user._id,
            verified: user.verified,

            profile_pic: user.profile_pic,
            email: user.email,
            full_name: user.full_name,
            authorized: user.authorized,
          });
        } else if (user.is_employer) {
          RespondEmployerWithToken(res, user);
        } else {
          RespondWorkerWithToken(res, user);
        }

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
    const user = await User.findOne({ email: body.email });
    if (!user) {
      const employee = new User({
        verified: false,

        profile_pic: body.profile_pic,
        email: body.email,
        password: bcrypt.hashSync(body.password, 8),
        full_name: body.full_name,
        authorized: NEW,
      });
      const createdUser = await employee.save();

      res.send({
        verified: createdUser.verified,

        profile_pic: createdUser.profile_pic,
        email: createdUser.email,
        password: createdUser.password,
        full_name: createdUser.full_name,
        authorized: createdUser.authorized,
      });
    } else {
      res.status(401).send({ message: 'Email already exist!' });
    }
  })
);

userRouter.post(
  '/register/account',
  expressAsyncHandler(async (req, res) => {
    const query = req.query;
    const body = req.body;
    const user = await User.findOne({ email: query.email });
    if (user) {
      user.verified = true;
      user.birth_day = body.birth_day;
      user.address = body.address;
      user.city = body.city;
      user.sex = body.sex;
      user.documentation_links = body.documentation_links;
      user.position = body.position;

      if (body.status == 'Employer') {
        (user.is_employer = true),
          (user.name_of_business = body.name_of_business);
        user.address_of_business = body.address_of_business;
        user.nature_of_business = body.nature_of_business;
        const verifiedUser = await user.save();

        RespondEmployerWithToken(res, verifiedUser);
      } else {
        (user.is_employer = false), (user.nature_of_work = body.nature_of_work);
        const verifiedUser = await user.save();

        RespondWorkerWithToken(res, verifiedUser);
      }
    } else {
      res.status(401).send({ message: 'Cannot find account' });
    }
  })
);

userRouter.put(
  '/:id/tag',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const body = req.body;
    if (user) {
      user.most_skilled = body.most_skilled;
      const updatedUser = await user.save();
      if (updatedUser.is_employer) {
        RespondEmployer(res, updatedUser);
      } else {
        RespondWorker(res, updatedUser);
      }
    }
  })
);

userRouter.put(
  '/:id/documentation',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const body = req.body;
    if (user) {
      user.documentation_links = [
        ...user.documentation_links,
        body.newDocument,
      ];
      const updatedUser = await user.save();
      if (updatedUser.is_employer) {
        RespondEmployer(res, updatedUser);
      } else {
        RespondWorker(res, updatedUser);
      }
    }
  })
);

export default userRouter;
