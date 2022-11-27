import expres from "express";
import { Post, postValidate, likeValidate } from "../models/post.js";
import { Comment, commentValidate } from "../models/comment.js";
const router = expres.Router();

router.get("/", async (req, res) => {
   // const users = await Post.find().populate("comments.comment");
   // const users = await Post.find().populate("likes.users");
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
});

router.get("/comments", async (req, res) => {
   const comments = await Comment.find();
   return res.send(comments);
});

router.post("/comments/create", async (req, res) => {
   const { error } = commentValidate(req.body);
   if (error) {
      return res.send({ message: error.details[0].message });
   }

   try {
      const getPost = await Post.findById(req.body.post);
      if (getPost.comments.count === 0) {
         const comment = await Comment({
            post: getPost._id,
            comments: [{ user: req.body.user, text: req.body.text }],
         }).save();

         await Post.findByIdAndUpdate(getPost._id, {
            comments: {
               count: getPost.comments.count + 1,
               comment: comment._id,
            },
         });
         return res.send(comment);
      }
      const comment = await Comment.findById(getPost.comments.comment);
      console.log(comment);
      const updateComment = await Comment.findByIdAndUpdate(comment._id, {
         comments: [...comment.comments, { user: req.body.user, text: req.body.text }],
      });

      await Post.findByIdAndUpdate(getPost._id, {
         comments: { ...getPost.comments, count: getPost.comments.count + 1 },
      });

      return res.send(updateComment);
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Post Not found" });
   }
});

router.post("/like", async (req, res) => {
   const { error } = likeValidate(req.body);
   if (error) {
      return res.send({ message: error.details[0].message });
   }

   try {
      const post = await Post.findById(req.body.post);

      if (post.likes.users.indexOf(req.body.user) === -1) {
         const updatedPost = await Post.findByIdAndUpdate(post._id, {
            likes: {
               count: post.likes.count + 1,
               users: [req.body.user],
            },
         });

         return res.send(updatedPost);
      }
      const updatedPost = await Post.findByIdAndUpdate(post._id, {
         likes: {
            count: post.likes.count - 1,
            users: post.likes.users.filter((user) => user === req.body.user),
         },
      });

      return res.send(updatedPost);
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Post Not found" });
   }
});

export default router;
