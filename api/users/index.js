import express from "express";

const userRouter = express.Router();
//map all rest apis here.

userRouter.get("", (req, res) => {
  res.json({ msg: "hello from users" });
});
export default userRouter;
