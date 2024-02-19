import express from "express";
import { check, validationResult } from "express-validator";
import UserModel2 from "../../models/UserModels2.js";

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
// business constraints :
/*
1. email should be unique
2. password should be encrypted and stored in the database
3. save the user details
4. generate the token
//=> 3,2,1,4
*/
userRouter.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Pls incldue valid email id").isEmail(),
  check("password", "pls enter a password with 6 or more chars").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    // reading request body and extracting the data and performing validation with defined check methods .==> will be done byvalidationResult method.

    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      //res.json({ ...req.body });
      const { name, email, password } = req.body;
      // destructuring the request body
      const user = new UserModel2({ name, email, password });
      await user.save(); // will save the user details in the database
      res.status(201).json({ user }); // key will be user: value will be userObject from this code.
    }
  }
);
export default userRouter;
