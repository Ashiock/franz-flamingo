const mongoose = require("mongoose")

const suscription_Schema = new mongoose.Schema(
    {

        user_id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("suscription", suscription_Schema)
