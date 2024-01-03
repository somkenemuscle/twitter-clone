const express = require('express');
const router = express.Router();
const handleAsyncErr = require('../utils/catchAsync');
const isLoggedin = require('../utils/isLoggedin');

// GET the current user's information
router.get("/", isLoggedin, handleAsyncErr(async (req, res, next) => {
    // Access the logged-in user's information available in req.user
    const currentUser = req.user;
    // Send the user information back as a JSON response
    res.json(currentUser);
}));

module.exports = router;