const Expert = require("../model/Expert")
const Like = require("../model/Like")
const Subscription = require("../model/Subscription")
const Video = require("../model/Video")

const { encryptPassword, comparePassword } = require("./encryption")

const createExpert = async (req, res, next) => {
    try {

        let hash = await encryptPassword(req.body.password)
        let expert = await Expert.create({
            ...req.body,
            password: hash,
            isAccepted: false
        })
        res.status(200).json(expert)
    } catch (e) {
        res.status(400).json({
            message: "error creating user, check your input"
        })
    }
}

const doesExpertExist = async (req, res, next) => {
    try {

        const expert = await Expert.findOne({ username: req.params.username })
        if (expert) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }


    } catch (e) {
        res.status(400).json(e)
    }
}

const getMostViewedVideos = async (req, res, next) => {
    try {
        const videos = await Video.find({ uploaderId: req.verifiedExpert._id }).sort({ views: -1 }).limit(5)
        res.status(200).json(videos)
    } catch (e) {
        res.status(400).json(e)
    }
}

const getExpertVideos = async (req, res, next) => {
    try {
        const videos = await Video.find({ uploaderId: req.verifiedExpert._id }).sort({ views: -1 })
            .skip((req.params.page - 1) * 15)
            .limit(15)
        const numberOfVideos = await Video.countDocuments({ uploaderId: req.verifiedExpert._id })
        const pageCount = Math.ceil(numberOfVideos / 15)
        res.status(200).json({ videos, pageCount })
    } catch (e) {
        res.status(400).json(e)
    }
}
const changePassword = async (req, res, next) => {
    try {
        const expert = await Expert.findById(req.verifiedExpert._id)
        const isMatch = await comparePassword(req.body.oldpassword, expert.password)
        if (isMatch) {
            const newPassword = await encryptPassword(req.body.newpassword)
            const updatedUser = await Expert.findByIdAndUpdate(req.verifiedExpert._id, { password: newPassword })
            res.status(200).json(updatedUser)
        } else {
            res.status(400).json({ message: "Wrong password" })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

const uploadPicture = async (req, res, next) => {
    try {
        const updatedUser = await Expert.findByIdAndUpdate(req.verifiedExpert._id, { picture: req.body.picture })
        res.status(200).json(updatedUser)
    } catch (e) {
        res.status(400).json(e)
    }
}
const getExpertProfile = async (req, res, next) => {
    try {
        const expert = await Expert.findById(req.params.id)
        const videos = await Video.find({ uploaderId: req.params.id })
        res.status(200).json({ expert, videos })
    }
    catch (e) {
        res.status(400).json(e)
    }
}
const getProfileInfo = async (req, res, next) => {
    try {
        const expert = await Expert.findOne({ _id: req.verifiedExpert._id })

        res.status(200).json(expert)
    }
    catch (e) {

        res.status(400).json(e)
    }
}

exports.createExpert = createExpert
exports.doesExpertExist = doesExpertExist
//authorized
exports.getMostViewedVideos = getMostViewedVideos
exports.getExpertProfile = getExpertProfile
exports.getExpertVideos = getExpertVideos

exports.uploadPicture = uploadPicture
exports.changePassword = changePassword
exports.getProfileInfo = getProfileInfo