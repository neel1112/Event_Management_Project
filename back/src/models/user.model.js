const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
    
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
    },
    mobile_no: {
      type: Number,
      require: true,
      unique: [true, "mobile number is already used"],
    },
    gender: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    otp: {
      type: Number,
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      mobile_no: this.mobile_no,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
