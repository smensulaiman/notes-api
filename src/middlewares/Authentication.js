const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {

    try {

        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, process.env.SECRET_KEY)
            req.userId = user.id
        } else {
            res.status(400).json({message: "Unauthorized User"})
        }

        next()

    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Unauthorized User"})
    }

}

module.exports = authentication