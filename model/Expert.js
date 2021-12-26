const mongoose = require("mongoose")
const ExpertSchema = new mongoose.Schema({
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
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 13
    },
    password: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true,
    },
    links: {
        type: [String]
    },
    picture: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png"
    },
    isAccepted: {
        type: Boolean,
        required: false,
        default: false
    }
})
const Expert = mongoose.model("expert", ExpertSchema)
module.exports = Expert