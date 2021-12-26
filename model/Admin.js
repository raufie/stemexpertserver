const mongoose = require("mongoose")
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logs: {
        type: [JSON],
    }

})
const Admin = mongoose.model("admin", AdminSchema)
module.exports = Admin