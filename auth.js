const jwt = require("jsonwebtoken");
const userModel = require('./users/userModel');

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.send({ status: false, message: 'Token is required' });
    }
    try {

        const user = jwt.verify(token, process.env.SECRET || "secretKey",);
        const userExists = userModel.findOne({ _id: user?.user?.id });

        if (userExists) {
            req.user = user;
        }
        else {
            res.send({ message: 'Token is not valid' });
        }
    } catch (err) {
        return res.send({ message: 'Token is not valid' });
    }
    next();
}

module.exports = verifyToken;
