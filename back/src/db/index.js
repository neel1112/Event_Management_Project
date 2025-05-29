const mongoose = require("mongoose")
const { DATABASE_NAME } = require("../constant.js")

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DATABASE_NAME}`)
        console.log(`\nMongoDB connectd !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error : ", error)
        process.exit(1)
    }
}

module.exports = connectDB