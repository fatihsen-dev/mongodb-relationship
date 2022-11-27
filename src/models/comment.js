import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const commentSchema = new Schema({
   post: { type: Schema.Types.ObjectId, ref: "Post" },
   comments: [{ user: { type: Schema.Types.ObjectId, ref: "User" }, text: String }],
});

export const commentValidate = (post) => {
   return Joi.object({
      post: Joi.string().min(20).max(28).required(),
      user: Joi.string().min(20).max(28).required(),
      text: Joi.string().min(10).max(600).required(),
   }).validate(post);
};

export const Comment = mongoose.model("Comment", commentSchema);
