// to hold DB related configuration.
import mongoose from "mongoose";
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/devmmc2";

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Mongodb Connected....");
  } catch (err) {
    console.log(err.message);
  }
};
export default connectDB;
