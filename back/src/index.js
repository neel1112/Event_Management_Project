const dotenv = require('dotenv')
const connectDB = require('./db/index.js')
const app = require('./app.js')
dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 4597

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log("DATABASE connetion error : ", error)
        process.exit(1)
    })