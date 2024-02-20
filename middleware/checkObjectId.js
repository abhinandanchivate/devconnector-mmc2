import mongoose from "mongoose";

const checkObjectId = (idToCheck) => (req, res, next) => {
  console.log("value " + idToCheck);
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
    return res.status(400).json({ msg: "Invalid id" });
  }
  next();
};

export default checkObjectId;
