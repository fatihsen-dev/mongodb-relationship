import expres from "express";
import { Post, postValidate } from "../models/post.js";
const router = expres.Router();

router.get("/", async (req, res) => {
   const users = await Post.find().populate("user");

   return res.send(users);
});

router.post("/create", async (req, res) => {
   const { error } = postValidate(req.body);

   if (error) {
      return res.send({ message: error.details[0].message });
   }

   try {
      const post = new Post({
         user: req.body.user,
         text: req.body.text,
      });

      post.save();
      return res.send(post);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server error!" });
   }

   return res.send(users);
});

export default router;
