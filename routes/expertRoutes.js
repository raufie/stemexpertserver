const router = require("express").Router()
const expertController = require("../controller/expertController")
const authController = require("../controller/authController")
const userController = require("../controller/userController")
const videoController = require("../controller/videoController")
//anonymous routes
router.post("/", expertController.createExpert)
router.get("/expertexists/:username", expertController.doesExpertExist)
router.post("/signin", authController.signInExpert)

//routes for user only
router.get("/info", authController.verifyExpert, expertController.getProfileInfo)
router.get("/issubscribed/:id", authController.verifyUser, userController.isSubscribed)
router.get('/:id', authController.verifyUser, expertController.getExpertProfile)
router.post("/:id/subscribe", authController.verifyUser, userController.subscribeToExpert)
router.post("/:id/unsubscribe", authController.verifyUser, userController.unSubscribeToExpert)

router.get("/", authController.verifyExpert, authController.getExpert)

//routes for experts only
router.get("/videos/mostviewed/", authController.verifyExpert, expertController.getMostViewedVideos)
router.get("/videos/:page", authController.verifyExpert, expertController.getExpertVideos)

router.get("/video/:id", authController.verifyExpert, videoController.getVideo)

router.put("/changepassword", authController.verifyExpert, expertController.changePassword)
router.put("/changepicture", authController.verifyExpert, expertController.uploadPicture)



module.exports = router