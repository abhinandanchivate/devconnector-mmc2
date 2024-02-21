import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { check, validationResult } from "express-validator";
import normalizeUrl from "normalize-url";
import ProfileModels from "../../models/ProfileModel.js";
import UserModels2 from "../../models/UserModels2.js";
const profileRouter = express.Router();
//map all rest apis here.

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
profileRouter.get("/", async (req, res) => {
  try {
    let profile = await ProfileModels.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return;
      res.status(400).json({ msg: "there is no profile for user" });
    }

    const user = await UserModels2.findById(req.user.id, { name: 1, email: 1 });
    console.log(user);
    profile._doc.user = user;
    //console.log(profile.users);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

profileRouter.post(
  "/",
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills are required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      console.log(req.body);
      const {
        website,
        skills,
        status,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
        ...rest
      } = req.body;
      console.log(rest?.abc);
      // building the profileobject for schema usage.
      const profileFields = {
        user: req.user.id,

        website:
          website && website !== ""
            ? normalizeUrl(website, { forceHttps: true })
            : "",
        skills: Array.isArray(skills)
          ? skills
          : skills.split(",").map((s) => " " + s.trim()),
      };
      // we have to build the social object
      const socialFields = { youtube, twitter, facebook, linkedin, instagram };
      Object.entries(socialFields).forEach(([key, value]) => {
        if (value && value.length > 0)
          socialFields[key] = normalizeUrl(value, { forceHttps: true });
      });
      // for (const [key, value] of Object.entries(socialFields)) {
      //   if (value && value.length > 0)
      //     socialFields[key] = normalizeUrl(value, { forceHttps: true });
      // }

      profileFields.socialFields = socialFields;

      try {
        // if there is no recrod then create a new profile(upsert: ) or else update the existing one.
        //
        let profile = await ProfileModels.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { setDefaultsOnInsert: true, new: true, upsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
      }
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private

profileRouter.put(
  "/exp",
  check("title", "Title is required").notEmpty(),
  check("company", "company is required").notEmpty(),
  check("from", "from date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // find out the profile.
      const profile = await ProfileModels.findOne({ user: req.user.id });
      // we have to add the exp details into the exp array.
      profile.experience.unshift(req.body);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error" });
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

profileRouter.delete("/exp/:exp_id", async (req, res) => {
  try {
    const profile = await ProfileModels.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      (e) => e._id.toString() !== req.params.exp_id
    );
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

export default profileRouter;
