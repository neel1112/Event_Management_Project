const Booking = require('../models/booking.model')

const booking = async (req, res) => {
    try {
        const { event_id } = req.body

        const book = await Booking.create({ event_id, user_id: req.user._id })

        return res
            .json(
                {
                    success: true,
                    message: "Event Booked Successfully",
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const getBooking = async (req, res) => {    
    try {
        const book = await Booking.find({ user_id: req.user._id }).populate("event_id").select("-user_id -__v")

        console.log(book)
        if (!book) {
            return res
                .json(
                    {
                        success: true,
                        message: "No Event Booked",
                    }
                )
        }

        return res
            .json(
                {
                    success: true,
                    message: "Booking event fetched",
                    data: book
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
// for show all the bookings
const showallBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();

        return res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}
module.exports = { booking, getBooking, showallBookings }