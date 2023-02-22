const express = require("express");
const app = express();
const userRouter = require("./routes/UserRoutes");
const noteRouter = require("./routes/NoteRoutes");

const mongoose = require("mongoose").default

app.use(express.json())
app.use("/users", userRouter)
app.use("/notes", noteRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})

mongoose.connect("mongodb+srv://admin:admin@cluster0.tclmc9f.mongodb.net/?retryWrites=true&w=majority")
    .then(r => {
        app.listen(5000, callbacks)
    })
    .catch((error) => {
        console.log(error)
    })
function callbacks() {
    console.log("Server started at 5000")
}