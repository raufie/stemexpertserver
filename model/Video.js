const mongoose = require("mongoose")
const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "no description"
    },
    filename: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        required: false,
        default: "https://i.ytimg.com/vi/Z-QX5_q-_xI/hqdefault.jpg"
    },
    uploaderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
}
)
const Video = mongoose.model("video", VideoSchema)
module.exports = Video