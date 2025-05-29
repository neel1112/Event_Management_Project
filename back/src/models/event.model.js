const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        s_date: {
            type: String,
            require: true
        },
        e_date: {
            type: String,
            require: true
        },
        s_time: {
            type: String,
            require: true,
        },
        e_time: {
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        category_id: {
            type: String,
            require: true,

        },
        category_name: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        event_status: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    }
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event