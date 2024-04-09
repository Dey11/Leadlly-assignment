import mongoose from "mongoose";

export const connectToDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Database has been connected.");
  } catch (err) {
    console.log(err);
  }
};
