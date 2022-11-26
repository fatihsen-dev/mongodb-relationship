import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const commentSchema = new Schema({
   post: { type: Schema.Types.ObjectId, ref: "Post" },
   comment: {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, max: 400 },
      date: Date.now,
   },
});

export const commentValidate = (post) => {
   return Joi.object({
      user: Joi.required().min(20).max(28),
      text: Joi.min(10).max(600),
   }).validate(post);
};

const Comment = mongoose.model("Comment", commentSchema);
