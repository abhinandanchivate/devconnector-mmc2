import express from "express";
import { check, validationResult } from "express-validator";
const userRouter = express.Router();
//map all rest apis here.
console.log("hello from usrs");
userRouter.get("", (req, res) => {
  res.json({ msg: "hello from users" });
});

/*
end point : /api/v1/users/register
method : POST
description : used to register a user with details
type:public endpoint :
*/
userRouter.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Pls incldue valid email id").isEmail(),
  check("password", "pls enter a password with 6 or more chars").isLength({
    min: 6,
  }),
  (req, res) => {
    const errors = validationResult(req);
    // reading request body and extracting the data and performing validation with defined check methods .==> will be done byvalidationResult method.

    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ ...req.body });
  }
);
export default userRouter;
