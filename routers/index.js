import express from "express";
import userRouter from "../api/users/index.js";
import profileRouter from "../api/profiles/index.js";
import authRouter from "../api/users/auth.js";
const generateVersionRouter = (version) => {
  const router = express.Router();
  router.use("/users", userRouter);
  router.use("/profile", profileRouter);
  router.use("/auth", authRouter);
  // router.use("/posts", postRouter);
  return router;
};
export default generateVersionRouter;
