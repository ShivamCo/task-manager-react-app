import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import "dotenv/config.js";

//import routes
import { Authentication } from './routes/authentication.js';
import { TasksManagment } from './routes/TasksManagment.js';
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



//Mongoose
const MONGODB_URL = process.env.MONGODB_URL

try {
    mongoose.connect(MONGODB_URL)
    .then(console.log(`Database is Connected`))
} catch(error){
    console.log(error)
}


//Routes
app.use("/api/", Authentication)
app.use("/api", TasksManagment)

app.listen(PORT, ()=>{
    console.log( `Server is Live on ${PORT} `)
})