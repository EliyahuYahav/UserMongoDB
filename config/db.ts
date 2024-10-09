import mongoose from "mongoose";

const connectDb = async ():Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("mongo connect");
  } catch (error) {
    console.log(error);
  }
};


export default connectDb;