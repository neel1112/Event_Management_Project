const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization");

    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -otp"
    );

    if (user?.block == true) {
      return res.json({
        success: false,
        message: "Your account is suspended",
      });
    }

    delete user?.block;

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Access Token",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error?.message || "Somthing want to wrong",
    });
  }
};

module.exports = verifyJWT;
