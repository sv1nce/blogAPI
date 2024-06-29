import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const jwtSecret = process.env.JWT_SECRET;

const dbConnectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose
    .connect(dbConnectionString)
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database Connection Error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/uploads', uploadRoutes);


app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server running on port 3000');
});

