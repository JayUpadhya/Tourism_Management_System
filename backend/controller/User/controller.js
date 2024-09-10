// controller.js
const User = require('../../model/User/model');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, passportNumber, phoneNumber, country, gender } = req.body;
        const user = new User({ firstName, lastName, email, password, dateOfBirth, passportNumber, phoneNumber, country, gender });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            res.status(401).json({ message: "Invalid email or password" });
        } else {
            res.status(200).json({ message: "Login successful" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadUserDetails = async (req, res) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, passportNumber, phoneNumber, country, gender } = req.body;
        const user = new User({ firstName, lastName, email, password, dateOfBirth, passportNumber, phoneNumber, country, gender });
        await user.save();
        res.status(201).json({ message: "User details uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserDetails, uploadUserDetails };
