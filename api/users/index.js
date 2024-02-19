import express from "express";
import { check, validationResult } from "express-validator";
import UserModel2 from "../../models/UserModels2.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    try {
      const errors = validationResult(req);
      // reading request body and extracting the data and performing validation with defined check methods .==> will be done byvalidationResult method.

      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        //res.json({ ...req.body });
        // whether the email is already existing or not

        const { name, email, password } = req.body;
        let user = await UserModel2.findOne({ email });
        console.log("user details", user);
        if (user) {
          return res.status(400).json({ msg: "Already existing user" });
        }
        // destructuring the request body
        // gensalt : it generates salt using a specific factor 10 which indicates the number of rounds to use. ==> to secure your content
        const salt = await bcrypt.genSalt(10); // this should come from env.
        // this hashes the password using salt generated in the last step.
        // hashed value we will use in the db to store the password.

        const encryptedPassword = await bcrypt.hash(password, salt);
        user = new UserModel2({
          name,
          email,
          password: encryptedPassword,
        });
        await user.save(); // will save the user details in the database
        // 1st here we have set the payload
        // we will use the methods to generate the token
        const payload = { user: { id: user.id } }; // roles as well
        // we may add other tokens which are reqd for comm.
        jwt.sign(payload, "jwtSecret", { expiresIn: 60 }, (err, token) => {
          if (err) {
            throw err;
          }
          const userResponse = { ...user._doc, token };
          res.status(201).json(userResponse);
        });

        // res.status(201).json({ user }); // key will be user: value will be userObject from this code.
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error" });
    }
  }
);
export default userRouter;

// login : do we need to pass credentails and  we will get a new token as a response.
// to get the usedetails based on the token
// /auth/me:
