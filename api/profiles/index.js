import express from "express";

const profileRouter = express.Router();
//map all rest apis here.
profileRouter.get("", (req, res) => {
  res.json({ msg: "hello from profiles" });
});
export default profileRouter;
