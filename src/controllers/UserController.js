const userModel = require("../models/ModelUser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {

    const {username, email, password} = req.body
    try {

        const existingUser = await userModel.findOne({email: email})
        if (existingUser) {
            return res.status(400).json({message: "user already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const result = await userModel.create({
            email: email,
            password: hashPassword,
            username: username
        })

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, process.env.SECRET_KEY)

        res.status(200).json({user: result, token: token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong!!!"})
    }

}

const signIn = async (req, res) => {

    const {email, password} = req.body

    try {

        const existingUser = await userModel.findOne({email: email})
        if (!existingUser) {
            return res.status(400).json({message: "No user is registered with this email address"})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({message: "Password didn't match"})
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, SECRET_KEY)

        res.status(200).json({user: existingUser, token: token})

    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Something went wrong!!!"})
    }

}

module.exports = {signUp, signIn}