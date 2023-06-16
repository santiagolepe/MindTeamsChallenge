import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "../utils/schemas";
import Transfer from "./transfer";

interface IUser extends Document {
  name         : string;
  email        : string;
  role         : Roles;
  password     : string;
  englishLevel?: string;
  skills?      : string;
  resumeLink?  : string;
};

const userSchema: Schema<IUser> = new Schema({
  name        : { type: String, required: true },
  email       : { type: String, required: true, unique: true },
  password    : { type: String, required: true },
  englishLevel: { type: String },
  skills      : { type: String },
  resumeLink  : { type: String },
  role        : { type: String, default: "user" },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  next();
});

// remove all logs Transfer files
userSchema.post<IUser>("remove", async function () {
  await Transfer.deleteMany({ user: this._id });
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
};

const User = mongoose.model("User", userSchema);
export default User;
