import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const postSchema = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
      image: { type: String, default: null },
      likes: {
         count: { type: Number, default: 0 },
         users: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      comments: {
         count: { type: Number, default: 0 },
         comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      },
   },
   { timestraps: true }
);

export const postValidate = (post) => {
   return Joi.object({
      user: Joi.string().required(),
      text: Joi.string().min(10).max(600).required(),
   }).validate(post);
};

export const Post = mongoose.model("Post", postSchema);
