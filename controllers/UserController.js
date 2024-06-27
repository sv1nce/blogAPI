import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '14d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating user',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            })
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Wrong login data',
            })
        }
        const token = jwt.sign({
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '14d',
            });
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch (error){
        console.log(error);
        res.status(500).json({
            message: 'Login Error',
        });
    }
};

export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const {passwordHash, ...userData} = user._doc;

        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No Access',
        });
    }
};