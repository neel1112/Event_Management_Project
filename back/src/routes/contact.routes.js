const Router = require("express")
const upload = require("../middleware/multer.middleware")
const { sendmessage, allmessage } = require("../controllers/contact.controller")
const verifyJWT = require("../middleware/admin.middleware")

const router = Router()

router.route("/sendmessage").post(upload.none(), sendmessage)
router.route("/allmessage").get(verifyJWT, upload.none(), allmessage)

module.exports = router