import expres from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = expres();
app.use(bodyParser.json());
dotenv.config();

import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(6000, async () => {
   console.log("server all ready");
});

(async () => {
   try {
      await mongoose.connect(process.env.DB_URL);
      console.log("connected mongodb");
   } catch (err) {
      console.log(err);
   }
})();

app.get("/", (req, res) => {
   return res.send({ message: "mongoose relationship" });
});
