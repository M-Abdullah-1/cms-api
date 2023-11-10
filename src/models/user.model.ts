import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IUser } from "./../interfaces/user.interface";

/**
 * Mongoose schema for the User model.
 *
 * @type {Schema<IUser>}
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["admin", "guide", "lead-guide", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: "Password are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

/**
 * Mongoose pre-save middleware to hash the password before saving the user.
 *
 * @function
 * @async
 * @param {Function} next - The next function in the middleware chain.
 * @returns {Promise<void>} - A Promise that resolves when the middleware completes.
 */
userSchema.pre("save", async function (next) {
  // Only run this function if Password are modified.
  if (!this.isModified("password")) return next();

  // Hashed the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.set("passwordConfirm", undefined);
  next();
});

/**
 * Mongoose method to check if the provided password matches the user's stored password.
 *
 * @function
 * @async
 * @param {string} candidatePassword - The password to check.
 * @param {string} userPassword - The user's stored password.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the passwords match, false otherwise.
 */
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * Mongoose model for the User collection.
 *
 * @type {Model<IUser>}
 */
const userModel = mongoose.model("User", userSchema);

export default userModel;
