const express = require("express");
const app = express();
const userRouter = require("./routes/UserRoutes");
const noteRouter = require("./routes/NoteRoutes");
const dotenv = require("dotenv")
const cors = require("cors");

dotenv.config()

const mongoose = require("mongoose").default

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use("/users", userRouter)
app.use("/notes", noteRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL)
    .then(r => {
        app.listen(PORT, callbacks)
    })
    .catch((error) => {
        console.log(error)
    })
function callbacks() {
    console.log("Server started at port : " + PORT)
}