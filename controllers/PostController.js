import PostModel from "../models/post.js";

export const deletePost = async (req, res) => {
  try{
    const postId = req.params.id;
    const post = await  PostModel.findOneAndDelete(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }
    res.json({
      message: 'Post deleted successfully',
    });
  }
  catch(err){
    res.status(500).json({
      message: 'Error Deleting Post',
    });
  }
};

export const getAll = async (req, res) => {
  try{
     const posts = await PostModel.find();
     res.json(posts);
  }
  catch(error){
    res.status(500).json({
      message: 'Error Getting all posts',
    });
  }
};

export const getOne = async (req, res) => {
  try{
    const postId = req.params.id;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(post);
  }
  catch(error){
    console.log(error);
    res.status(404).json({
      message: 'Error Getting post',
    });
  }
};

export const createPost = async (req, res) => {
  const doc = new PostModel({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    });
  const post = await doc.save();
  res.json(post);
};

export const editPost = async (req, res) => {
  try{
    const postId = req.params.id;
    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
          title: req.body.title,
          content: req.body.content,
          tags: req.body.tags,
          imageUrl: req.body.imageUrl,
        },
        { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }
    res.json(updatedPost);
  }
  catch(err){
    res.status(500).json({
      message: 'Error editing post',
    });
  }
};