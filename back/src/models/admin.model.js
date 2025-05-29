const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema(
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
        password: {
            type: String,
            require: [true, "Password is required"]
        },
    },
    {
        timestamps: true
    }
)

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.genrateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin