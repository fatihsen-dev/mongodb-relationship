import expres from "express";
const router = expres.Router();
import { User, userValidate } from "../models/user.js";

router.get("/", async (req, res) => {
   try {
      const users = await User.find();
      return res.send(users);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "server error!" });
   }
});

router.post("/create", async (req, res) => {
   const { error } = userValidate(req.body);

   if (error) {
      return res.status(404).send({ message: error.details[0].message });
   }

   const { firsName, lastName, username, email, password } = req.body;

   try {
      const user = new User({
         firsName,
         lastName,
         username,
         email,
         password,
      });

      await user.save();
      return res.send(user);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server error!" });
   }
});

export default router;
