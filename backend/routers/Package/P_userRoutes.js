const express = require('express');
const User = require('../../model/Package/P_UserModel');

const router = express.Router();

//User Package CRUD

//save package user customize
router.post('/user/save', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(200).json({
            Success: "User saved successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

//get package user customize
router.get('/user', async (req, res) => {
    try {
        const users = await User.find().exec();
        return res.status(200).json({
            success: true,
            existingUser: users
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

//get specific package user customize
router.get('/user/:id', async(req, res)=> {
    try {
        const userID = req.params.id;
        const user = await User.findById(userID).exec();
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Customize Package not found' });
        }
        
        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

//update  package user customize
router.put('/user/update/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        return res.status(200).json({
            success: "Customize package Updated Successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

//delete  package user customize
router.delete('/user/delete/:id', async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Customize Package Delete Successful",
            deleteUser
        });
    } catch (error) {
        return res.status(400).json({
            message: "Customize Package Delete Unsuccessful",
            error: error.message
        });
    }
});
module.exports = router;