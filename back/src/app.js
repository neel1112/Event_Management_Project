const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// middleware
app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
const userRouter = require('./routes/user.routes')
const adminRouter = require('./routes/admin.routes')
const contactRouter = require('./routes/contact.routes')


// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/contact", contactRouter)

module.exports = app