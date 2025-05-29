const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            require: [true, "this feild is require"],
        },
        URL: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category
