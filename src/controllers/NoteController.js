const noteModel = require("../models/ModelNote")

const createNote = async (req, res) => {

    const {title, description} = req.body

    const newNote = new noteModel({
        title : title,
        description : description,
        userId : req.userId
    })

    try{
        await newNote.save()
        res.status(200).json(newNote)
    }catch (e) {
        console.log(e);
        res.status(500).json({message : "Something went wrong!!!"})
    }

}

const updateNote = async (req, res) => {

    const id = req.params.id
    const {title, description} = req.body

    const newNote = {
        title : title,
        description : description,
        userId : req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, {new : true})
        res.status(200).json(newNote)
    }catch (e) {
        console.log(e);
        res.status(500).json({message : "Something went wrong!!!"})
    }

}

const deleteNote = async (req, res) => {
    const id = req.params.id
    try {
        await noteModel.findByIdAndDelete(id)
        res.status(200).json("Note deleted successfully!!!")
    }catch (e) {
        console.log(e);
        res.status(500).json({message : "Something went wrong!!!"})
    }
}

const getNotes = async (req, res) => {

    try {
        const notes = await noteModel.find({userId: req.userId})
        res.status(200).json(notes)
    }catch (e) {
        console.log(e);
        res.status(500).json({message : "Something went wrong!!!"})
    }

}

module.exports = {
    createNote, updateNote, deleteNote, getNotes
}