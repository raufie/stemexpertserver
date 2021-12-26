const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5
    },
    age: {
        type: Number,
        required: true,
        min: 13
    },
    password: {
        type: String,
        required: true,
    },

})
const User = mongoose.model("user", UserSchema)
module.exports = User