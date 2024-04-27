import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import signUpRoutes from './routes/signup.route.js'
dotenv.config();

//the app define
const app = express();



//for json result
app.use(express.json());

// use cores
app.use(cors());


const port = process.env.PORT;

// create the backend connection 
app.listen(port, ()=>{
  console.log(`the backend server is running on ${port}`);
})

//the database string 
const data = process.env.MONGO;

// the database connection
mongoose.connect(data).then(()=>{
    console.log('connect');
}).catch((err)=>{
    console.log(err);
})

app.use('/api/route',userRoutes);
app.use('/api/auth',signUpRoutes);

//create the middleware for error 

app.use((err,req,res,next) =>{
  const statusCode = err.StatusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  });
});