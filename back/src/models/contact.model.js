const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema(
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
            type: String,
            require: true,
        },
        message: {
            type: String,
            require: true
        },
    },
    {
        timestamps: true
    }
)

const Contact = mongoose.model("Contact", contactSchema)
module.exports = Contact