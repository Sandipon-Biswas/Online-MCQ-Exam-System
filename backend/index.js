import "dotenv/config";
import express from "express";
import mongoose  from "mongoose";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import examRoutes from './routes/examRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import connectToMongo from "./config/db.js";


const app=express();
app.use(express.json());
connectToMongo()
app.use(cors());
app.get('/',(req,res)=>{
    res.send("this is quiz app");
})
// Routes
app.use('/api/users', userRoutes );
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);



const port= process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running is http://localhost:${port} `)
})