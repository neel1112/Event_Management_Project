const Router = require("express");
const verifyJWT = require("../middleware/admin.middleware.js");
const {
  register,
  login,
  logout,
  update,
  passwordChange,
  getcurrentAdmin,
  postCategory,
  deleteCategory,
  showCategory,
  updateCategory,
} = require("../controllers/admin.controller.js");
const {
  alluser,
  blockandunblockuser,
} = require("../controllers/user.controller.js");
const upload = require("../middleware/multer.middleware.js");
const {
  postevent,
  showEvents,
  showEventsByCategory,
  updateEvent,
  showallEvents,
} = require("../controllers/events.controller.js");

const router = Router();

router.route("/register").post(upload.none(), register);
router.route("/login").post(upload.none(), login);

//secured routes
router.route("/logout").post(upload.none(), verifyJWT, logout);
router.route("/update").post(upload.none(), verifyJWT, update);
router.route("/passwordChange").post(upload.none(), verifyJWT, passwordChange);
router.route("/getcurrentAdmin").get(upload.none(), verifyJWT, getcurrentAdmin);
router.route("/addevent").post(verifyJWT, upload.single("image"), postevent);
router.route("/showevents").post(upload.none(), showEvents);
router.route("/showallevents").get(showallEvents);
router.route("/addcategory").post(verifyJWT, upload.single("URL"), postCategory);
router.route("/deletecategory/:id").delete(upload.none(), verifyJWT, deleteCategory);
router.route("/showcategory").get(showCategory);
router.route("/showeventsbycategory").post(upload.none(), showEventsByCategory);
router.route("/updatecategory/:id").post(verifyJWT, upload.single("URL"), updateCategory);
router.route("/updateevent/:id").post(verifyJWT, upload.single("URL"), updateEvent);
router.route("/getalluser").get(upload.none(), verifyJWT, alluser);
router.route("/blockandunblockuser").post(upload.none(), verifyJWT, blockandunblockuser);


module.exports = router;
