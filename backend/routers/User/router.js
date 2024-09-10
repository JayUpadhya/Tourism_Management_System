const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require('../../controller/User/controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/details', getUserDetails); // New endpoint to fetch user details

module.exports = router;