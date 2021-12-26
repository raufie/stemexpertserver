const User = require("../model/User")
const Subscription = require("../model/Subscription")
const Like = require("../model/Like")
const Video = require("../model/Video")
const { encryptPassword, comparePassword } = require("./encryption")

//any auth will do
const getVideos = async (req, res, next) => {
    try {

        const videos = await Video.find({}).sort({ createdAt: -1 }).skip((req.params.page - 1) * 15).limit(15)
        const nVideos = await Video.count()
        const pageCount = Math.ceil(nVideos / 15)

        res.status(200).json({ videos, pageCount })
    } catch (e) {
        res.status(400).json(e)
    }

}
const getSearchedVideos = async (req, res, next) => {
    try {
        const videos = await Video.find({ title: { $regex: req.params.search, $options: 'i' } })
            .sort({ createdAt: -1 }).skip((req.params.page - 1) * 15).limit(15)

        const nVideos = await Video.find({ title: { $regex: req.params.search, $options: 'i' } }).count()
        const pageCount = Math.ceil(nVideos / 15)
        res.status(200).json({ videos, pageCount })
    } catch (e) {
        res.status(400).json(e)
    }
}
const getVideo = async (req, res, next) => {
    try {
        const video_likes = await Like.find({ videoId: req.params.id, like: "like" }).count()
        const dislikes = await Like.find({ videoId: req.params.id, like: "dislike" }).count()

        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, { views: video.views + 1 })
        res.status(200).json({
            video, likes: {
                nlikes: video_likes, ndislikes: dislikes
            }
        })
    } catch (e) {
        res.status(400).json(e)
    }
}

const getVideoLikes = async (req, res, next) => {
    try {
        const nlikes = await Like.find({ videoId: req.params.id, like: "like" }).count()
        const ndislikes = await Like.find({ videoId: req.params.id, like: "dislike" }).count()
        res.status(200).json({
            nlikes,
            ndislikes
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}


const likeVideo = async (req, res, next) => {
    //like:"like" or "dislike" or "none"
    try {
        const ilike = await Like.findOne({ userId: req.verifiedUser._id, videoId: req.params.id })
        if (ilike) {
            const like = await Like.updateOne({ _id: ilike._id }, {
                userId: req.verifiedUser._id,
                videoId: req.params.id,
                like: req.body.like
            })
            res.status(200).json(like)

        } else {
            const like = await Like.create({
                userId: req.verifiedUser._id,
                videoId: req.params.id,
                like: req.body.like
            })
            res.status(200).json(like)
        }
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}


const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id)
        res.status(200).json(video)
    } catch (e) {
        res.status(400).json(e)
    }
}

const uploadVideo = async (req, res, next) => {
    try {
        const video = await Video.create({ ...req.body, uploaderId: req.verifiedExpert._id })
        res.status(200).json(video)
    } catch (e) {
        res.status(400).json(e)
    }
}
const getVideoLike = async (req, res, next) => {
    try {
        const like = await Like.findOne({ userId: req.verifiedUser._id, videoId: req.params.id })
        res.status(200).json(like)
    } catch (e) {
        res.status(400).json(e)
    }
}

exports.getVideos = getVideos
exports.getSearchedVideos = getSearchedVideos
exports.likeVideo = likeVideo
exports.getVideo = getVideo
exports.getVideoLikes = getVideoLikes
exports.getVideoLike = getVideoLike
exports.deleteVideo = deleteVideo
exports.uploadVideo = uploadVideo