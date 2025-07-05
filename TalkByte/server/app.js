import express from 'express';
import cookieParser from 'cookie-parser';

import { config } from 'dotenv';
import fileUpload from 'express-fileupload';

import cors from 'cors';
import { connectDB } from './database/db.js';

import userRouter from './routes/user.routes.js';

const app=express();

config({
    path:'./config/config.env'
})
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir : './tmp/'   
}))

// all the routes originate from here

app.use('/api/v1/user',userRouter);

connectDB();
export default app;
