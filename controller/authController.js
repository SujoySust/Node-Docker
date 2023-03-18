const User = require("../models/userModel");

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try {
        const {username,password} = req.body;
        const hashPassword = await bcrypt.hash(password,12);

        const newUser = User.create({
            username,
            password: hashPassword
        });
        res.status(200).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch(e) {
        res.status(400).json({
            status: "error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
        const isCorrect = await bcrypt.compare(password, user.password);  
        if (isCorrect) {
            res.status(200).json({
                status: 'success',
                data: {
                    user: user
                } 
            });
        } else {
            res.status(400).json({
                status: 'error',
                data: "Incorrect username and password"
            });
        }

    } catch(e) {
        console.log(e);
        res.status(400).json({
            status: "error"
        })
    }
}