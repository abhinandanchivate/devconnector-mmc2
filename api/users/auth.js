import express from "express";
import { check, validationResult } from "express-validator";
import UserModel2 from "../../models/UserModels2.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../../middleware/authMiddleware.js";
const authRouter = express.Router();
// @route    GET api/auth
// @desc     Get user by token
// @access   Private
// header should contain 'Authorization token  and we will get it via x-auth-token header.

authRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel2.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});
// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

authRouter.post(
  "/",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        let user = await UserModel2.findOne({ email: email });
        if (!user) {
          return res.status(400).json({ msg: "User not found" });
        }
        //if data exists'
        // password : our provided value (not encrypted) user.password : encrypted password value stored in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "invalid credentials" });
        }
        const payload = { user: { id: user.id } }; // roles as well
        // we may add other tokens which are reqd for comm.
        jwt.sign(payload, "jwtSecret", { expiresIn: 60 }, (err, token) => {
          if (err) {
            throw err;
          }
          const userResponse = { ...user._doc, token };
          res.status(200).json(userResponse);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
      }
    }
  }
);
export default authRouter;
