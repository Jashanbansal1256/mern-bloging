import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();


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