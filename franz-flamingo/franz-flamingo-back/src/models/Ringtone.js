const mongoose = require("mongoose")

const ringtone_Schema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        downloads: {
            type: String,
            required: true,
        },
        file_id: {
            type: String,
            required: true,
            select: false
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("ringtone", ringtone_Schema)
