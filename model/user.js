import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true},
  email: {type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true},
  password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

export const User = mongoose.model("User", userSchema);