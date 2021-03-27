import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { NEW } from '../api/api_constants.js';

const userRouter = express.Router();

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if(!user.verified){
          res.send({
            _id: user._id,
            verified: user.verified,

            email: user.email,
            full_name: user.full_name,
            authorized: user.authorized,
          });

        } else if(user.is_employer){
          res.send({
            _id: user._id,
            verified: user.verified,

            email: user.email,
            full_name: user.full_name,
            authorized: user.authorized,


            is_employer: user.is_employer,
            birth_day: user.birth_day,
            address: user.address,
            city: user.city,
            sex: user.sex,
            most_skilled: user.most_skilled,

            name_of_document: user.name_of_document,
            documentation_link: user.documentation_link,
            position: user.position,

            // EMPLOYER
            name_of_business: user.name_of_business,
            address_of_business: user.address_of_business,
            nature_of_business: user.nature_of_business,
          });          
        }else{

          res.send({
            verified: verifiedUser.verified,

            email: verifiedUser.email,
            password: verifiedUser.password,
            full_name: verifiedUser.full_name,
            authorized: verifiedUser.authorized,


            is_employer: verifiedUser.is_employer,
            birth_day: verifiedUser.birth_day,
            address: verifiedUser.address,
            city: verifiedUser.city,
            sex: verifiedUser.sex,
            most_skilled: user.most_skilled,

            name_of_document: verifiedUser.name_of_document,
            documentation_link: verifiedUser.documentation_link,
            position: verifiedUser.position,

            // EMPLOYEE
            nature_of_work: verifiedUser.nature_of_work,
          });
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
    const user = await User.findOne({email: body.email})
    if(!user){
      const employee = new User({
        verified: false,
        email: body.email,
        password: bcrypt.hashSync(body.password, 8),
        full_name: body.full_name,
        authorized: NEW,
      });
      const createdUser = await employee.save();

      res.send({
        verified: createdUser.verified,

        email: createdUser.email,
        password: createdUser.password,
        full_name: createdUser.full_name,
        authorized: createdUser.authorized,
      });

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
    const user = await User.findOne({ email : query.email });
    if(user){
      user.verified = true;
      user.birth_day = body.birth_day;
      user.address = body.address;
      user.city = body.city;
      user.sex = body.sex;
      user.name_of_document = body.name_of_document;
      user.documentation_link = body.documentation_link;
      user.position = body.position;

      if(body.status == 'Employer'){
        user.is_employer = true,
        user.name_of_business = body.name_of_business;
        user.address_of_business = body.address_of_business;
        user.nature_of_business = body.nature_of_business;
        const verifiedUser = await user.save();

        res.send({
          verified: verifiedUser.verified,

          email: verifiedUser.email,
          password: verifiedUser.password,
          full_name: verifiedUser.full_name,
          authorized: verifiedUser.authorized,


          is_employer: verifiedUser.is_employer,
          birth_day: verifiedUser.birth_day,
          address: verifiedUser.address,
          city: verifiedUser.city,
          sex: verifiedUser.sex,

          name_of_document: verifiedUser.name_of_document,
          documentation_link: verifiedUser.documentation_link,
          position: verifiedUser.position,

          // EMPLOYER
          name_of_business: verifiedUser.name_of_business,
          address_of_business: verifiedUser.address_of_business,
          nature_of_business: verifiedUser.nature_of_business,
        });


      }else{
        user.is_employer = false,
        nature_of_work = body.nature_of_work;
        const verifiedUser = await user.save();

        res.send({
          verified: verifiedUser.verified,

          email: verifiedUser.email,
          password: verifiedUser.password,
          full_name: verifiedUser.full_name,
          authorized: verifiedUser.authorized,


          is_employer: verifiedUser.is_employer,
          birth_day: verifiedUser.birth_day,
          address: verifiedUser.address,
          city: verifiedUser.city,
          sex: verifiedUser.sex,

          name_of_document: verifiedUser.name_of_document,
          documentation_link: verifiedUser.documentation_link,
          position: verifiedUser.position,

          // EMPLOYEE
          nature_of_work: verifiedUser.nature_of_work,
        });

      }

    }else{
      res.status(401).send({ message: 'Cannot find account' });
    }
  })
);

export default userRouter;
