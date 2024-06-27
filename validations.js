import { body } from 'express-validator';

export const loginValidator = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').isEmail().withMessage('Password is required'),
];

export const registerValidator = [
    body('email', 'This email format is wrong').isEmail(),
    body('password', 'Password should have at least 8 symbols').isLength({min: 8}),
    body('fullName', 'Write a Full Name').isLength({min: 4}),
    body('avatarUrl', 'Wrong URL for an avatar').optional().isURL(),
];

export const postCreateValidator = [
    body('title', 'Title is required').isLength({min: 6}).isString(),
    body('content', 'Content is required').isLength({min: 50}).isString(),
    body('tags', 'Not good format for tags').optional().isArray(),
    body('imageUrl', 'Wrong URL for an image').optional().isURL(),
];


