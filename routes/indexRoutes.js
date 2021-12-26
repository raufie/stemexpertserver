const router = require("express").Router();
const authController = require("../controller/authController")
const Expert = require("../model/Expert")
router.get("/", async (req, res, next) => {
    console.log(JSON.stringify(req.headers))
    if (true) {
        const experts = await Expert.find({ isAccepted: false })
        res.render("index", { experts })
    } else {
        res.render("signin")
    }


}, (req, res) => {

    res.render("index")
})


module.exports = router;