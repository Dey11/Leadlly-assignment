import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: false,
    default: "",
  },
  description: {
    type: String,
    default: "",
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
