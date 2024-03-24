const mongoose = require("mongoose");

//Schema define
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    }, last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        type: String
    }
}, { timestamps: true });

const userData = mongoose.model("users", userSchema);

module.exports = {userData};
