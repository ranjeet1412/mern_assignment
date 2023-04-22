import express from 'express';
import cors from "cors";
import mongoose from "mongoose"
import { userRouter } from './routes/User.js';


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth" , userRouter )

mongoose.connect("mongodb+srv://ranjit2805:Ranjit2805@e-commerce.utx5che.mongodb.net/e-commerce?retryWrites=true&w=majority")

app.listen(3001 , () => {console.log("server started...")})