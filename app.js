// entry point for our server.
import express from "express";
import server from "./server.js";
import userRouter from "./api/users/index.js";
import profileRouter from "./api/profiles/index.js";
import generateVersionRouter from "./routers/index.js";

import { config } from "dotenv";
const PORT = 3001;
const app = server;
config();
// /api/v1
//mountApiVersionRouter(app, "/api/v1/users", userRouter);
// router(app);
//version2
// /api/v2
//app.use("/api/v1", middleWareFunction, router(app));
const apiVersions = ["v1", "v2", "v3"];
app.use(express.json());
apiVersions.forEach((version) => {
  const versionRouter = generateVersionRouter(version);
  app.use(`/api/${version}`, versionRouter);
});
app.get("", (req, res) => {
  res.json({ msg: "OK" });
});
console.log(app);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
