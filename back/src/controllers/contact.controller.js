const Contact = require("../models/contact.model")

const sendmessage = async (req, res) => {
    try {
        const { fullName, email, mobile_no, message } = req.body

        if (!fullName && !email && !mobile_no && !message) {
            return res
                .json(
                    {
                        success: true,
                        message: "All fields are required",
                    }
                )
        }
        await Contact.create({
            fullName,
            email,
            mobile_no,
            message
        })
        return res
            .json(
                {
                    success: true,
                    message: "message send successfully admin contact you ASAP",
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const allmessage = async (req, res) => {
    try {
        const allmesage = await Contact.find()
        return res
            .json(
                {
                    success: true,
                    message: "all data featch successfully",
                    data: allmesage
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { sendmessage, allmessage }