const router = require("express").Router()
const userController = require("../controller/userController")
const authController = require("../controller/authController")

//anon routes
router.post("/", userController.createUser)
router.get("/userexists/:username", userController.doesUserExist)
router.post("/signin", authController.signInUser)
//routes for user opnly
router.get("/", authController.verifyUser, authController.getUser)
router.get("/videos", authController.verifyUser, userController.getUserVideos)
router.get("/subscriptions", authController.verifyUser, userController.getUserExperts)
//      user:profile
router.put("/changepassword", authController.verifyUser, userController.changePassword)

module.exports = router