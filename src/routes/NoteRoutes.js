const express = require("express")
const {getNotes, createNote, deleteNote, updateNote} = require("../controllers/NoteController");
const auth = require("../middlewares/Authentication")
const noteRouter = express.Router()

noteRouter.get("/", auth, getNotes)

noteRouter.post("/", auth, createNote)

noteRouter.delete("/:id", auth, deleteNote)

noteRouter.put("/:id", auth, updateNote)

module.exports = noteRouter