import express from "express";
import ProfileModels from "../../models/ProfileModel.js";
import { checkExact } from "express-validator";
import checkObjectId from "../../middleware/checkObjectId.js";
import UserModels2 from "../../models/UserModels2.js";

const publicProfileRouter = express.Router();

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github(3rd party api calls )
// @access   Public

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

publicProfileRouter.get("/", async (req, res) => {
  try {
    let profile = await ProfileModels.find();

    if (!profile) {
      return;
      res.status(400).json({ msg: "there is no profile for user" });
    }

    //console.log(profile.users);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
publicProfileRouter.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async (req, res) => {
    const { user_id } = req.params;

    try {
      let profile = await ProfileModels.findOne({
        user: user_id,
      });

      if (!profile) {
        return res.status(400).json({ msg: "there is no profile for user" });
      }

      const user = await UserModels2.findById(user_id, {
        name: 1,
        email: 1,
      });
      console.log(user);
      profile._doc.user = user;
      //console.log(profile.users);
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error" });
    }
  }
);

export default publicProfileRouter;
