import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

//function for signup controller

export const signup = async (req, res,next) => {
  //console.log(req.body);

  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.json(400).json({ message: "All fields are required" });
    next(errorHandler(400,'all fields are required'));
  }

  //do the password is hashed
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // use the user model thats we create in the user.model.js

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  // save the model in the database
  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};
