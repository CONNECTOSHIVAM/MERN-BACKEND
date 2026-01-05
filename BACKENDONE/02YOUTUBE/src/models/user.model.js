import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ""
  },
  watchHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
  try {

    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    return next();

  } catch (err) {
    return 
  }
});




// CHECK PASSWORD
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// ACCESS TOKEN
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};


// REFRESH TOKEN
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
