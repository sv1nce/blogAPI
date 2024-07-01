import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl:String,
    likes:{
        type: Number,
        default: 0,
    },
    },
    {
    timestamps: true,
    },
);

postSchema.index({ author: 1 }, { unique: false });

export default mongoose.model("Post", postSchema);