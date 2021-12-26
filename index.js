const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require("config")
const path = require("path")
//routes
const userRoutes = require("./routes/userRoutes")
const expertRoutes = require("./routes/expertRoutes")
const videoRoutes = require("./routes/videoRoutes")
const indexRoutes = require("./routes/indexRoutes")
const adminRoutes = require("./routes/adminRoutes")
//mongoose connection
mongoose.connect(config.get("mongoURI")).then(conn => {
    console.log("connection established with mongodb")
}).catch(err => {
    console.log("error connecting with mongodb")
})

const app = express()

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }))
app.set("view engine", 'ejs')

//vip middlewares
app.use(cors())
app.use(express.json())
//serversiderendering
app.use("/api/admin/index", indexRoutes)
//middleware routes
app.use("/api/users/", userRoutes)
app.use("/api/experts/", expertRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/admin", adminRoutes)


app.listen(process.env.PORT || 3001, () => {
    console.log("listening at", 3001)
})