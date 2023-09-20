// const bcrypt = require('bcrypt');
const userModel = require('./userModel');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    try {
        console.log(req.body, "ffffff")
        let data = req.body;
        // data.password = bcrypt.hashSync(pwdToHash, 10);
        const user = new userModel(data)
        let result = await user.save()
        if (result) {
            res.status(200).send({ message: "Successs" })
        } else {
            res.status(500).send({ message: "failed" })
        }

    } catch (error) {
        console.log(error, "ffffff")

    }

}
const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let userQuery = { email }
        let userExists = await userModel.findOne(userQuery);
        if (userExists) {
            // if (await bcrypt.compare(password, userExists.password)) {
            if (password == userExists.password) {
                let tokenData = {
                    id: userExists._id,
                    email: userExists?.email,
                }
                let token = jwt.sign(
                    {
                        user: tokenData
                    },
                    process.env.SECRET || "secretKey",
                    { expiresIn: '24h' }
                )
                let resSend = {
                    username: userExists.lastname,
                    email: email,
                    token: token,
                }
                res.status(200).send({ status: true, message: "Succesfully loged in", data: resSend })
            } else {
                res.status(500).send({ message: "Please enter valid password" })
            }
        } else {
            res.status(500).send({ message: "User not exist" })
        }
    } catch (error) {
        console.log(error, "error")
        res.send({ message: error })
    }
}

module.exports = {
    signup, login
}