const User = require("../model/User")
const Subscription = require("../model/Subscription")
const Like = require("../model/Like")
const Video = require("../model/Video")
const { encryptPassword, comparePassword } = require("./encryption")
const Expert = require('../model/Expert')
const createUser = async (req, res, next) => {
    try {
        let hash = await encryptPassword(req.body.password)
        // let user = await User.create(req.body)
        let user = await User.create({
            ...req.body,
            password: hash
        })
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json({
            message: "error creating user, check your form"
        })
    }
}

const doesUserExist = async (req, res, next) => {
    try {

        const user = await User.findOne({ username: req.params.username })
        if (user) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }


    } catch (e) {
        res.status(400).json(e)
    }
}
const getUserExperts = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ userId: req.verifiedUser._id })
        const experts = await Expert.find({ _id: { $in: subscriptions.map(sub => sub.expertId) } })

        res.status(200).json(experts)
    } catch (e) {
        res.status(400).json(e)
    }
}
const getUserVideos = async (req, res, next) => {
    //returns the videos of the experts the user has subscribed
    try {
        const subscriptions = await Subscription.find({ userId: req.verifiedUser._id })
        const videos = await Video.find({ uploaderId: { $in: subscriptions.map(sub => sub.expertId) } })
        res.status(200).json(videos)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.verifiedUser._id)
        if (await comparePassword(req.body.oldpassword, user.password)) {
            let hash = await encryptPassword(req.body.newpassword)
            await User.findByIdAndUpdate(req.verifiedUser._id, { password: hash })
            res.status(200).json(true)
        } else {
            res.status(400).json(false)
        }
    } catch (e) {
        res.status(400).json(e)
    }
}


const getVideoExpert = async (req, res, next) => {
    try {
        const expert = await Expert.findById(req.params.id)
        const isSubscribed = await Subscription.findOne({ userId: req.verifiedUser._id, expertId: req.params.id })
        if (isSubscribed) {
            res.status(200).json({ expert, subscribed: true })
        } else {
            res.status(200).json({ expert, subscribed: false })
        }
    } catch (e) {
        res.status(400).json(e)
    }
}

const unSubscribeToExpert = async (req, res, next) => {

    try {
        const subscription = await Subscription.findOneAndDelete({ userId: req.verifiedUser._id, expertId: req.params.id })
        res.status(200).json(subscription)
    } catch (e) {
        res.status(400).json(e)

    }
}
const subscribeToExpert = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            userId: req.verifiedUser._id,
            expertId: req.params.id
        })
        res.status(200).json(subscription)

    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

const isSubscribed = async (req, res, next) => {
    try {
        const expert = await Subscription.findOne({ userId: req.verifiedUser._id, expertId: req.params.id })
        if (expert) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }

    } catch (e) {
        res.status(400).json(e)
    }
}




exports.createUser = createUser
exports.doesUserExist = doesUserExist
exports.getUserExperts = getUserExperts
exports.getUserVideos = getUserVideos
exports.changePassword = changePassword
exports.subscribeToExpert = subscribeToExpert
exports.unSubscribeToExpert = unSubscribeToExpert
exports.isSubscribed = isSubscribed