import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import  bcryptjs  from 'bcryptjs';
import { errorHandler } from "../utils/error.js";


export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    //check if we have user
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
    else{
        const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
        //new user
        const newUser = new User({
            username:name.toLowerCase().split(' ').join('')+
            Math.random().toString(9).slice(-4),
            email,
            password:hashedPassword,
            profilePicture:googlePhotoUrl,
        });
        await newUser.save();
        //create the token
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        //separate the password 
        const {password , ...rest} = newUser._doc;
        res.status(200).cookie('access_token',token,{
            httOnly:true,
        })
        .json(rest);


    }
  } catch (error) {
    next(error);
  }
};
