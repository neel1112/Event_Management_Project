const Event = require("../models/event.model.js");
const Category = require("../models/category.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

const postevent = async (req, res) => {
  try {
    const {
      title,
      s_date,
      e_date,
      s_time,
      e_time,
      location,
      description,
      category_id,
      category_name,
      price,
    } = req.body;
    const avatarLocalPath = req.file?.path;
    if (
      [
        title,
        s_date,
        e_date,
        s_time,
        e_time,
        location,
        description,
        category_id,
        category_name,
        price,
      ].some((field) => field?.trim() === "")
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!avatarLocalPath) {
      return res.json({
        success: false,
        message: "image file is missing",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      return res.json({
        success: false,
        message: "Error while uploading on avatar",
      });
    }

    const event = await Event.create({
      title,
      s_date,
      e_date,
      s_time,
      e_time,
      location,
      description,
      category_id,
      category_name,
      price,
      image: avatar.url,
    });

    if (!event) {
      return res.json({
        success: false,
        message: "Something went wrong while event post",
      });
    }

    return res.json({
      success: true,
      message: "event post Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// for show all the event by id
const showEvents = async (req, res) => {
  try {
    const { _id } = req.body;

    const events = await Event.findById(_id);

    return res.json({
      success: true,
      message: `events `,
      data: events,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// for show all the events
const showallEvents = async (req, res) => {
  try {
    const events = await Event.find();

    return res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// find events by category
const showEventsByCategory = async (req, res) => {
  try {
    const { category_id } = req.body;
    const events = await Event.find({ category_id });

    // const finalData = [];

    // const currentDate = new Date();
    // const cu = currentDate.toISOString().slice(0, 10);
    // const currentTime = currentDate.toTimeString().slice(0, 5);

    // events.forEach((event) => {
    //     const startDate = new Date(event.s_date);
    //     const st = startDate.toISOString().slice(0, 10);
    //     if (st === cu) {
    //         const startTime = event.s_time
    //         if (currentTime < startTime) {
    //             finalData.push(event);
    //         }
    //     } else if (startDate > currentDate) {
    //         finalData.push(event);
    //     }
    // });

    return res.json({
      success: true,
      message: "All upcoming events found",
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// for update and event
const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      s_date,
      e_date,
      s_time,
      e_time,
      location,
      description,
      category_id,
      category_name,
      price,
    } = req.body;
    const eventImgLocalPath = req.file?.path;

    if (
      !id ||
      !title ||
      !s_date ||
      !e_date ||
      !s_time ||
      !e_time ||
      !location ||
      !description ||
      !category_id ||
      !category_name ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updates = {
      title,
      s_date,
      e_date,
      s_time,
      e_time,
      location,
      description,
      category_id,
      category_name,
      price,
    };

    if (eventImgLocalPath) {
      const eventImg = await uploadOnCloudinary(eventImgLocalPath);
      if (!eventImg.url) {
        return res.status(500).json({
          success: false,
          message: "Error while uploading an image",
        });
      }
      updates.image = eventImg.url;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update event: " + error.message,
    });
  }
};

module.exports = {
  postevent,
  showEvents,
  showEventsByCategory,
  updateEvent,
  showallEvents,
};
