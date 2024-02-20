import express from "express";
import userRouter from "../api/users/index.js";
import profileRouter from "../api/profiles/index.js";
import authRouter from "../api/users/auth.js";
import authMiddleware from "../middleware/authMiddleware.js";
import publicProfileRouter from "../api/profiles/publicProfileEndPoints.js";
const generateVersionRouter = (version) => {
  const router = express.Router();
  router.use("/users", userRouter);
  router.use("/profile", authMiddleware, profileRouter);
  router.use("/auth", authRouter);
  router.use("/publicProfileRouter", publicProfileRouter);
  // router.use("/posts", postRouter);
  return router;
};
export default generateVersionRouter;
