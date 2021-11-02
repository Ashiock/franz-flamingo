const mongoose = require("mongoose")

const download_Schema = new mongoose.Schema(
    {

        image_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("download", download_Schema)
