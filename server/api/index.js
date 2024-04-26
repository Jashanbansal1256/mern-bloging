import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import signUpRoutes from './routes/signup.route.js'
dotenv.config();

//the app define
const app = express();

//for json result
app.use(express.json());


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