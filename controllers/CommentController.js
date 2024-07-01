import CommentModel from '../models/comment.js';
import post from "../models/post.js";

export const createComment = async (req, res) => {
    try{
        const { content } = req.body;
        const postId = req.params.id;

        const comment = new CommentModel({
            content,
            user: req.userId,
            post: postId,
        });
        await comment.save();
        res.json(comment);
    }
    catch(err){
        res.json(err);
    }
};

export const getComment = async (req, res) => {
    try{
        const { id } = req.params;
        const comment = await CommentModel.find({post: id}).populate('user').exec();

        if (comment.length === 0) {
            return res.status(404).json({
                message: 'No comments found for this post',
            });
        }
        res.json(comment);
    }
    catch(err){
        res.json(err);
    }
};

export const likeComment = async (req, res) => {
    try{
        const comment = await CommentModel.findById(req.params.id);
        if (!comment) {
            res.status(404).json({
                'message': 'No comments found for this post',
            });
        }
        comment.likes += 1;
        await comment.save();
        res.json(comment);
    }
    catch(err){
        res.json(err);
    }
};