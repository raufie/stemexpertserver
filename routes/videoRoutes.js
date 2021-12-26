const router = require("express").Router()
const userController = require("../controller/userController")
const videoController = require("../controller/videoController")
const authController = require("../controller/authController")
const expertController = require("../controller/expertController")

//routes for user opnly
router.get("/:id/expert/likes", authController.verifySharedUser, videoController.getVideoLikes)

router.get("/videos/:page", authController.verifyUser, videoController.getVideos)
router.get("/search/:search/:page", authController.verifyUser, videoController.getSearchedVideos)

router.get("/:id", authController.verifyUser, videoController.getVideo)
router.get("/:id/likes", authController.verifyUser, videoController.getVideoLikes)
router.get("/:id/like", authController.verifyUser, videoController.getVideoLike)

router.post("/:id/like", authController.verifyUser, videoController.likeVideo)

//routes for experts only
router.delete("/:id", authController.verifyExpert, videoController.deleteVideo)
router.post("/", authController.verifyExpert, videoController.uploadVideo)
module.exports = router