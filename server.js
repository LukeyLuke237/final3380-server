import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import router from "./routes/arts.js";

const app = express();
const PORT = process.env.PORT || 5000;
const URL = 'mongodb://localhost:27017/ArtList';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

mongoose.connect(URL)
        .then(async () => {
            console.log("Connect to MongoDB");
            app.listen(PORT, () => {
                console.log("Server is listening on port " + PORT)
            })
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        })
