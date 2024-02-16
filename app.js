// entry point for our server.
import express from "express";
import server from "./server.js";
import router from "./routers/index.js";
import userRouter from "./api/users/index.js";
import profileRouter from "./api/profiles/index.js";
const PORT = 3001;
const app = server;

router(app);

app.get("", (req, res) => {
  res.json({ msg: "OK" });
});
console.log(app);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
