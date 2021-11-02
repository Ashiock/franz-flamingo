const mongoose = require("mongoose")

const file_Schema = new mongoose.Schema(
    {

        filename: {
            type: String,
            required: true,
        },
        filepath: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        }, 

    },
    { timestamps: true }
)

module.exports = mongoose.model("file", file_Schema)
