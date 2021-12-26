const router = require("express").Router()
const expertController = require("../controller/expertController")
const authController = require("../controller/authController")
const userController = require("../controller/userController")
const videoController = require("../controller/videoController")
const adminController = require("../controller/adminController")

router.post("/signin", authController.signInAdmin)

// router.post("/create", adminController.createAdmin)

module.exports = router;
