const Admin = require("../models/admin.model.js")
const Category = require("../models/category.model.js")
const uploadOnCloudinary = require("../utils/cloudinary.js")
const generateAccessTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId)
        const accessToken = await admin.genrateAccessToken()

        return accessToken
    } catch (error) {
        return res

            .json(
                {
                    success: false,
                    message: "Something went wrong while generating referesh and access"
                }
            )
    }
}

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        await Admin.create({
            fullName,
            email,
            password
        })

        return res

            .json(
                {
                    success: true,
                    message: "Admin register Successfully",
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email && !password) {
            return res

                .json(
                    {
                        success: false,
                        message: "email and password is required"
                    }
                )
        }

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res

                .json(
                    {
                        success: false,
                        message: "Invalid admin credentials"
                    }
                )
        }

        const isPasswordValid = await admin.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res

                .json(
                    {
                        success: false,
                        message: "Invalid admin credentials"
                    }
                )
        }

        const accessToken = await generateAccessTokens(admin._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res

            .cookie("accessToken", accessToken, options)
            .json(
                {
                    success: true,
                    message: "Admin logged In Successfully",
                    accessToken
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true
        }
        return res

            .clearCookie("accessToken", options)
            .json(
                {
                    success: true,
                    message: "Admin logged Out"
                }
            )
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const getcurrentAdmin = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: "Admindata fetch successfully",
            data: req.admin
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { fullName, email } = req.body

        if (!fullName && !email) {
            return res

                .json(
                    {
                        success: false,
                        message: "All fields are required"
                    }
                )
        }

        await Admin.findByIdAndUpdate(
            req.admin?._id,
            {
                $set: {
                    fullName,
                    email
                }
            },
        )

        return res

            .json(
                {
                    success: true,
                    message: "Account details updated successfully",
                }
            )

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const passwordChange = async (req, res) => {
    try {
        const { password, newPassword } = req.body

        if (!password && !newPassword) {
            return res

                .json(
                    {
                        success: false,
                        message: "All fields are required"
                    }
                )
        }

        const admin = await Admin.findById(req.admin._id)

        const isPasswordValid = await admin.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res

                .json(
                    {
                        success: false,
                        message: "old password doesn't match",
                    }
                )
        }

        admin.password = newPassword
        await admin.save({ validateBeforeSave: false })

        return res

            .json(
                {
                    success: true,
                    message: "password change successfully",
                }
            )

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
// for add category 
const postCategory = async (req, res) => {
    try {
        const { category_name } = req.body
        const categoryImgLocalPath = req.file?.path
        if (
            [category_name].some((field) => field?.trim() === "")
        ) {
            return res

                .json(
                    {
                        success: false,
                        message: "All fields are required"
                    }
                )
        }

        if (!categoryImgLocalPath) {
            return res
                .json(
                    {
                        success: false,
                        message: "image file is missing"
                    }
                )
        }

        const catImg = await uploadOnCloudinary(categoryImgLocalPath)

        if (!catImg.url) {
            return res
                .json(
                    {
                        success: false,
                        message: "Error while uploading an image"
                    }
                )
        }

        const category = await Category.create({ category_name, URL: catImg.url })

        if (!category) {
            return res
                .json(
                    {
                        success: false,
                        message: "Something went wrong while Category post"
                    }
                )
        }

        return res
            .json(
                {
                    success: true,
                    message: "Category post Successfully",
                }
            )

    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}
// for delete category 
const deleteCategory = async (req, res) => {
    try {

        const id = req.params.id

        const category = await Category.findByIdAndDelete(id)

        console.log(category)

        return res

            .json(
                {
                    success: true,
                    message: `Category deleted Successfully`,
                }
            )

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// For showing all categories
const showCategory = async (req, res) => {
    try {

        const categories = await Category.find()
        return res

            .json(
                {
                    success: true,
                    message: categories,
                }
            )

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
//for update categories
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { category_name } = req.body;
        const categoryImgLocalPath = req.file?.path;

        if (!id || !category_name) {
            return res.json({
                success: false,
                message: "Category ID, category_name, and image file are required"
            });
        }

        let updates = { category_name };

        if (categoryImgLocalPath) {
            const catImg = await uploadOnCloudinary(categoryImgLocalPath);
            if (!catImg.url) {
                return res.json({
                    success: false,
                    message: "Error while uploading an image"
                });
            }
            updates.URL = catImg.url;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updatedCategory) {
            return res.json({
                success: false,
                message: "Category not found"
            });
        }

        return res.json({
            success: true,
            message: "Category updated successfully",
        });

    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to update category: " + error.message
        });
    }
};


module.exports = { register, login, logout, getcurrentAdmin, update, passwordChange, postCategory, deleteCategory, showCategory, updateCategory }