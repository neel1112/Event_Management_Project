const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Booking = mongoose.model("Booking", bookingSchema)
module.exports = Booking