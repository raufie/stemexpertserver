const { encryptPassword, comparePassword } = require("./encryption")
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../model/User")
const Expert = require("../model/Expert")
const Admin = require("../model/Admin")

const createAdmin = async (req, res, next) => {
    try {
        let hash = await encryptPassword(req.body.password)
        // let user = await User.create(req.body)
        let admin = await Admin.create({
            ...req.body,
            password: hash
        })
        res.status(200).json(admin)
    } catch (e) {
        res.status(400).json({
            message: "error creating user, check your form"
        })
    }
}

exports.createAdmin = createAdmin