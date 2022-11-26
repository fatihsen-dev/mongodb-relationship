import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const userSchema = new Schema(
   {
      firsName: String,
      lastName: String,
      avatar: { type: String, default: null },
      username: String,
      email: String,
      password: String,
   },
   { timestraps: true }
);

export const userValidate = (user) => {
   return Joi.object({
      firsName: Joi.string().min(2).required(),
      lastName: Joi.string().min(2).required(),
      username: Joi.string().min(5).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(30).required(),
   }).validate(user);
};

export const User = mongoose.model("User", userSchema);
