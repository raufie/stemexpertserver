const { comparePassword } = require("./encryption")
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../model/User")
const Expert = require("../model/Expert")
const Admin = require("../model/Admin")
const signInUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            const result = await comparePassword(req.body.password, user.password)
            if (result) {
                //sign thisn with jwt then send
                const token = jwt.sign({ _id: user._id, type: "user" }, config.get("jwtkey"))
                res.status(200).json({ token })
            } else {
                res.status(400).json({ message: "wrong password" })
            }

        } else {
            res.status(404).json({ message: "user not found" })
        }
    }
    catch (e) {
        res.status(400).json(e)
    }
}
const signInExpert = async (req, res, next) => {
    try {
        const expert = await Expert.findOne({ username: req.body.username })
        if (expert) {
            const result = await comparePassword(req.body.password, expert.password)
            // if (!expert.isAccepted) {
            //     res.status(400).json({ message: "your application is not approved yet" })
            // }
            // else 
            if (result) {
                //sign thisn with jwt then send
                const token = jwt.sign({ _id: expert._id, type: "expert" }, config.get("jwtkey"))
                res.status(200).json({ token })
            } else {
                res.status(400).json({ message: "wrong password" })
            }

        } else {
            res.status(404).json({ message: "user not found" })
        }
    }
    catch (e) {
        res.status(400).json(e)
    }
}
const verifyUser = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) {
            res.status(401).json({ message: "no token" })
        } else {
            //token exists, verify it
            const result = await jwt.verify(token, config.get("jwtkey"))
            const dbUser = await User.findOne({ _id: result._id })
            if (dbUser) {
                req.verifiedUser = result

                next()
            } else {
                res.status(401).json({ message: "user not found" })
            }
        }

    } catch (e) {
        res.status(400).json({ message: "invalid token" })

    }
}

//experts auth
const verifyExpert = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) {
            res.status(401).json({ message: "no token" })
        } else {

            //token exists, verify it
            const result = await jwt.verify(token, config.get("jwtkey"))
            const dbUser = await Expert.findOne({ _id: result._id })
            if (dbUser) {
                req.verifiedExpert = result
                next()
            } else {
                res.status(404).json({ message: "user not found" })
            }
        }
    } catch (e) {
        res.status(400).json({ message: "something went wrong we are working on it" })

    }
}
const verifySharedUser = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) {
            res.status(401).json({ message: "no token" })
        } else {

            //token exists, verify it
            let result = await jwt.verify(token, config.get("jwtkey"))
            const dbUser = await Expert.findOne({ _id: result._id })
            if (dbUser) {
                req.verifiedExpert = result
                next()
            } else {
                result = await jwt.verify(token, config.get("jwtkey"))
                const user = await User.findOne({ _id: result._id })
                if (user) {
                    req.verifiedUser = result
                    next()
                } else {
                    res.status(404).json({ message: "user not found" })
                }
            }
        }
    } catch (e) {
        res.status(400).json({ message: "something went wrong we are working on it" })

    }
}

const getUser = async (req, res, next) => {
    try {
        res.status(200).json(req.verifiedUser)
    } catch (e) {
        res.status(400).json({ message: "something went wrong we are working on it" })

    }
}
const getExpert = async (req, res, next) => {
    try {

        res.status(200).json(req.verifiedExpert)
    } catch (e) {
        res.status(400).json({ message: "something went wrong we are working on it" })

    }
}

const signInAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username })
        if (admin) {
            const result = await comparePassword(req.body.password, admin.password)
            if (result) {
                //sign thisn with jwt then send
                const token = jwt.sign({ _id: admin._id, type: "admin" }, config.get("jwtkey"))
                res.status(200).json({ token })
            } else {
                res.status(400).json({ message: "wrong password" })
            }

        } else {
            res.status(404).json({ message: "user not found" })
        }
    }
    catch (e) {
        res.status(400).json(e)
    }
}
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) {
            res.status(401).json({ message: "no token" })
        } else {
            //token exists, verify it
            const result = await jwt.verify(token, config.get("jwtkey"))
            const dbUser = await Admin.findOne({ _id: result._id })
            if (dbUser) {
                req.verifiedUser = result

                next()
            } else {
                res.status(401).json({ message: "user not found" })
            }
        }

    } catch (e) {
        res.status(400).json({ message: "invalid token" })

    }
}


exports.signInUser = signInUser
exports.signInExpert = signInExpert

exports.verifyUser = verifyUser
exports.verifyExpert = verifyExpert

exports.getUser = getUser
exports.getExpert = getExpert
exports.verifySharedUser = verifySharedUser

exports.verifyAdmin = verifyAdmin
exports.signInAdmin = signInAdmin