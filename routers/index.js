//  i will consume it in my index.js from routers.

import profileRouter from "../api/profiles/index.js";
import userRouter from "../api/users/index.js";

const router = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/profiles", profileRouter);
  console.log("inside the router");
};
export default router;
