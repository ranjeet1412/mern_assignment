import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthdate:{ type: String, required: true},
  mobileno:{ type: String, required: true}
});

export const UserModel = mongoose.model("users", UserSchema);
