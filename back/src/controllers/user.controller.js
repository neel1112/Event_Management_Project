const User = require("../models/user.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const { sendOtp } = require("../utils/sendOtp.js");

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.genrateAccessToken();

    return accessToken;
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong while generating referesh and access",
    });
  }
};

const register = async (req, res) => {
  try {
    const { fullName, email, mobile_no, gender, password } = req.body;

    if (
      [fullName, email, password, gender, mobile_no].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const existeduser = await User.findOne({ mobile_no });

    if (existeduser) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      mobile_no,
      gender,
      password,
    });

    const createdUser = await User.findById(user._id);

    if (!createdUser) {
      return res.json({
        success: false,
        message: "Something went wrong while registering the user",
      });
    }

    if (createdUser.gender == "male") {
      createdUser.avatar =
        "https://res.cloudinary.com/dtdlad1ud/image/upload/v1703938887/y18sqhaus4snghlhcscm.jpg";
      createdUser.save({ validateBeforeSave: false });
    } else {
      createdUser.avatar =
        "https://res.cloudinary.com/dtdlad1ud/image/upload/v1703939018/yl9frkeayfp9wftlfz8l.jpg";
      createdUser.save({ validateBeforeSave: false });
    }

    return res.json({
      success: true,
      message: "User registered Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { mobile_no, password } = req.body;

    if (!mobile_no && !password) {
      return res.json({
        success: false,
        message: "mobile_no and password is required",
      });
    }

    const user = await User.findOne({ mobile_no });

    if (!user) {
      return res.json({
        success: false,
        message: "user does not exist",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid user credentials",
      });
    }

    if (user.block == true) {
      return res.json({
        success: false,
        message: "Your account is suspended",
      });
    }

    const accessToken = await generateAccessTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.cookie("accessToken", accessToken, options).json({
      success: true,
      message: "User logged In Successfully",
      accessToken,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.clearCookie("accessToken", options).json({
      success: true,
      message: "User logged Out",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getcurrentUser = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "userdata fetch successfully",
      data: req.user,
    });
  } catch (error) {
    return res.json({
      success: 0,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { fullName, email, gender } = req.body;

    if (!fullName && !email && !gender) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $set: {
        fullName,
        email,
        gender,
      },
    });

    return res.json({
      success: true,
      message: "Account details updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const avatar = async (req, res) => {
  try {
    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath);

    if (!avatarLocalPath) {
      return res.json({
        success: false,
        message: "Avatar file is missing",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      return res.json({
        success: false,
        message: "Error while uploading on avatar",
      });
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $set: {
        avatar: avatar.url,
      },
    });

    return res.json({
      success: true,
      message: "Avatar image updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const passwordChange = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    if (!password && !newPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user._id);

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "old password doesn't match",
      });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.json({
      success: true,
      message: "password change successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const sendotp = async (req, res) => {
  try {
    const { mobile_no } = req.body;

    if (!mobile_no) {
      return res.json({
        success: false,
        message: "mobile number fild required",
      });
    }

    const user = await User.findOne({ mobile_no });

    if (!user) {
      return res.json({
        success: false,
        message: "mobile number is not register",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const msg = `Your event otp is ${otp}`;

    const data = await sendOtp(mobile_no, msg);

    // console.log(data)

    if (data.success == false) {
      return res.json({
        success: false,
        message: "something want to wrong please try agine after some time",
      });
    }

    user.otp = otp;
    await user.save({ validateBeforeSave: false });

    return res.json({
      success: true,
      message: "otp send successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyotp = async (req, res) => {
  try {
    const { mobile_no, otp } = req.body;

    if (!mobile_no && !otp) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ mobile_no });

    if (user.otp != otp) {
      return res.json({
        success: false,
        message: "otp is wrong",
      });
    }

    user.otp = null;
    await user.save({ validateBeforeSave: false });

    return res.json({
      success: true,
      message: "otp verify successfully",
      Id: user._id,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const forgotpassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!password) {
      return res.json({
        success: false,
        message: "password fild required",
      });
    }

    const user = await User.findById(id);

    user.password = password;
    await user.save({ validateBeforeSave: false });

    return res.json({
      success: true,
      message: "password change successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const alluser = async (req, res) => {
  try {
    const alluser = await User.find().select("-password -otp");

    return res.json({
      success: true,
      message: "all user fetch successfully",
      data: alluser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const blockandunblockuser = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findById(_id);

    let aa;

    if (user.block == false) {
      user.block = true;
      await user.save({ validateBeforeSave: false });
      aa = "block";
    } else {
      user.block = false;
      await user.save({ validateBeforeSave: false });
      aa = "unblock";
    }

    return res.json({
      success: true,
      message: `user ${aa} successfully`,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getcurrentUser,
  update,
  avatar,
  passwordChange,
  sendotp,
  verifyotp,
  forgotpassword,
  alluser,
  blockandunblockuser,
};
