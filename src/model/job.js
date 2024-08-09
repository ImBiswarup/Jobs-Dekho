import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    type: {
        type: String,
        required: true,
    },
    duration: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
            required: true,
        }
    ]
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
