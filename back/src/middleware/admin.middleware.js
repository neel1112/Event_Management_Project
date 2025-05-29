const Admin = require("../models/admin.model")
const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")

        if (!token) {
            return res
                .json(
                    {
                        success: false,
                        message: "Unauthorized request"
                    }
                )
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const admin = await Admin.findById(decodedToken?._id).select("-password")

        if (!admin) {
            return res
                .json(
                    {
                        success: false,
                        message: "Invalid Access Token"
                    }
                )
        }

        req.admin = admin;

        next()

    } catch (error) {
        return res
            .json(
                {
                    success: false,
                    message: error?.message || "Invalid access token"
                }
            )
    }
}

module.exports = verifyJWT