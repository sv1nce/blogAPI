import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import * as Validations from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';


mongoose
    .connect('mongodb+srv://admin:amstrad1@cluster0.nleutp2.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database Connection Error', err));

const app = express();
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
},
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());

app.post('/auth/register', Validations.registerValidator, handleValidationErrors, UserController.register);
app.post('/auth/login',Validations.loginValidator,handleValidationErrors ,UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth ,upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.post('/post', checkAuth,Validations.postCreateValidator, PostController.createPost);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.put('/posts/:id', PostController.editPost);
app.delete('/posts/:id', PostController.deletePost);


app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server running on port 3000');
});

