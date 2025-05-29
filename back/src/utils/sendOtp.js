const accountSid = process.env.ACCOUNTSID_API_KEY;
const authToken = process.env.AUTHTOKEN_API_KEY;
const client = require("twilio")(accountSid, authToken);

exports.sendOtp = async (mobile_no, msg) => {
    try {
        const message = await client.messages
            .create({
                to: `+91 ${mobile_no}`,
                from: process.env.TWILIO_NUMBER,
                body: msg,
            })
        return { success: true, sid: message.sid }
    } catch (error) {
        return { success: false, error }
    }
};