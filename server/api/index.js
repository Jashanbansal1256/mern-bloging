import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import signUpRoutes from './routes/signup.route.js';
import signInRoutes from './routes/signin.route.js';
import googleRoutes from './routes/google.route.js';
import updateRoutes from './routes/update.route.js';
import deleteRoutes from './routes/delete.route.js';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();


//the app define
const app = express();



//for json result
app.use(express.json());

//cookieparser
app.use(cookieParser());

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
app.use('/api/auth',signInRoutes);
app.use('/api/auth',googleRoutes);
app.use('/api/route',updateRoutes);
app.use('/api/route',deleteRoutes);


// app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.static(path.join(__dirname, 'client', 'dist')));


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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