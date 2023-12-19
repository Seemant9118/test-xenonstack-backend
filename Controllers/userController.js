const UserModel = require('../Models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registering a new User
const registerUser = async (req, res) => {
    // adding password security with salt "bcrypt package : hashing technique-AES"
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.user_password, salt);

    req.body.user_password = hashedPass;

    // taking user info
    const newUser = new UserModel(req.body);
    const { user_email } = req.body;

    // now interact in DB
    try {
        // if user is already registered
        const oldUser = await UserModel.findOne({ user_email });
        if (oldUser) {
            return res.status(400).json({ message: "user is already registered" });
        }
        // otherwise,saving new user in DB
        const user = await newUser.save();
        // JWT : javaScript Web Token : used for session expiration of page
        const token = jwt.sign({
            user_email: user.user_email, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' })

        // sending response
        res.status(200).json({ success: true, user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// login user
const loginUser = async (req, res) => {
    const { user_email, user_password } = req.body
    // intercat with DB
    try {
        const user = await UserModel.findOne({ user_email: user_email })
        // if user is present in db then , validate with password & then redirect to homePage through login 
        if (user) {
            const validity = await bcrypt.compare(user_password, user.user_password);

            if (!validity) {
                res.status(400).json("Wrong Password");
            }
            else {
                // JWT : session establishement
                const token = jwt.sign({
                    user_email: user.user_email, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                // sending response 
                res.status(200).json({ success: true,user, token })
            }
        }
        else {
            res.status(404).json("User does not exists")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


// get All Users
const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { user_password, ...otherDetails } = user._doc;
            return otherDetails;
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// get a specific user from database - READ
const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        // finding user exist or not
        const user = await UserModel.findById(id)
        if (user) {
            const { user_password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        }
        else {
            res.status(404).json("No such User exists")
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, getAllUsers, getUser};