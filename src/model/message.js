const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    subject: {
        type: String,
    },

    message: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)

module.exports = Message