const Router = require("express");
const {
  avatar,
  getcurrentUser,
  login,
  logout,
  register,
  update,
  passwordChange,
  forgotpassword,
  sendotp,
  verifyotp,
} = require("../controllers/user.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js");
const upload = require("../middleware/multer.middleware.js");
const { booking, getBooking ,showallBookings } = require("../controllers/booking.controller.js");
const router = Router();

router.route("/register").post(upload.none(), register);
router.route("/login").post(upload.none(), login);
router.route("/sendotp").post(upload.none(), sendotp);
router.route("/verifyotp").post(upload.none(), verifyotp);
router.route("/forgotpassword").post(upload.none(), forgotpassword);
//secured routes
router.route("/logout").post(upload.none(), verifyJWT, logout);
router.route("/update").post(upload.none(), verifyJWT, update);
router.route("/passwordChange").post(upload.none(), verifyJWT, passwordChange);
router.route("/avatar").post(verifyJWT, upload.single("avatar"), avatar);
router.route("/getcurrentUser").get(verifyJWT, getcurrentUser);
router.route("/booking").post(verifyJWT, upload.none(), booking);
router.route("/getbooking").get(verifyJWT, upload.none(), getBooking);
router.route("/showallbookings").get(upload.none(), showallBookings);

module.exports = router;
