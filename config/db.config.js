// to hold DB related configuration.
import mongoose from "mongoose";
const db = "mongodb://localhost:27017/devmmc2";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    console.log("Mongodb Connected....");
  } catch (err) {
    console.log("this is error message from Mongodb");
    console.log(err.message);
  }
};
export default connectDB;
