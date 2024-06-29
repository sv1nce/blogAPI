import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

// Function for hashing password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const register = async (req, res, next) => {
    const { password, fullName, email, avatarUrl } = req.body;

    try{
        const hash = await hashPassword(password);

        const doc = new UserModel({
            fullName,
            email,
            password: hash,
            avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "14d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch(err){
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user._doc.passwordHash);
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Wrong login data',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '14d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    }
    catch (err){
        next(err);
    }
};

export const getMe = async (req, res, next) => {
    try{
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    }
    catch (err) {
       next(err);
    }
};