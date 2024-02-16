const User = require('../model/myUserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require("./../Config.json");

exports.SignUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "User is already registered" });
        } else {
            const newUser = new User({
                fname,
                lname,
                email,
                password:hashedPassword
            });

            await newUser.save();
            return res.status(200).json({ message: "Account has been created!! Please Login" });
        }
    } catch (error) {
        console.error("Error in SignUp:", error);
        return res.status(500).json({ error: 'Registration failed' });
    }
};


exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {

            if (!user.password) {

                return res.status(400).json({ message: "User does not have a password set" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const accessToken = jwt.sign({
                    email: user.email,
                    user: {
                        name: user.fname
                    }
                }, config.accessTokenSecretKey, {
                    expiresIn: '15m',
                });

                const refreshToken = jwt.sign({ email: user.email }, config.refreshTokenSecretKey, {
                    expiresIn: '7d',
                });

                return res.json({ message: "Login successfully", user: user, accessToken, refreshToken });
            } else {
                return res.status(400).json({ message: "Password and confirm password didn't match" });
            }
        } else {
            return res.status(400).json({ message: "Please login to proceed" });
        }
    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ error: 'Could not get user data' });
    }
};