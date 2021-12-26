const mongoose = require("mongoose")
const LikeSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    like: {
        type: String,
        enum: ["like", "dislike", "none"],
        default: "none"
    }
}
)
LikeSchema.index({
    videoId: 1,
    userId: 1
},
    {
        unique: true
    }
)
const Like = mongoose.model("like", LikeSchema)
module.exports = Like