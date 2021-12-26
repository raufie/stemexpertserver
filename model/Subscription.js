const mongoose = require("mongoose")
const SubscriptionSchema = new mongoose.Schema({
    expertId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    subscribe: {
        type: String,
        enum: ["subscribed", "unsubscribed", "none"],
        default: "none"
    }
}
)
SubscriptionSchema.index({
    expertId: 1,
    userId: 1
},
    {
        unique: true
    }
)
const Subscription = mongoose.model("subscription", SubscriptionSchema)
module.exports = Subscription