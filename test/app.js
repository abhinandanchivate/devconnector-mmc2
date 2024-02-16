import express from "express";

const app = express();

const controller1MiddleWare = (req, res, next) => {
  req.id = "123";
  console.log("middleware for controller1");
  // res.send("updated values");
  next();
};
const controller2MiddleWare = (req, res, next) => {
  console.log("middleware for controller2");
  next();
};

const controller1Router = express.Router();
controller1Router.get("/route1", (req, res) => {
  res.json({ msg: "hello", id: req.id });
});
controller1Router.get("/route2", (req, res) => {
  res.json({ msg: "route2" });
});

const controller2Router = express.Router();
controller2Router.get("/route1", (req, res) => {
  res.json({ msg: "hello" });
});
controller2Router.get("/route2", (req, res) => {
  res.json({ msg: "route2" });
});

app.use("/controller1", controller1MiddleWare, controller1Router);
app.use("/controller2", controller2MiddleWare, controller2Router);
app.listen(6000, () => {});
