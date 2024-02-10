const express = require('express');
const router = express.Router();
const handleAsyncErr = require('../utils/catchAsync');
const isLoggedin = require('../utils/isLoggedin');
const { Tweet } = require('../models/tweet');

// GET the current user's information
router.post("/:tweetId/:userId", isLoggedin, handleAsyncErr(async (req, res, next) => {
    const { tweetId, userId } = req.params
    try {
        // Check if the user has already liked the tweet
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            console.log('Tweet not found');
            return;
        }

        if (tweet.likedBy.includes(userId)) {
            // User has already liked the tweet, so unlike it
            await Tweet.findByIdAndUpdate(tweetId, {
                $inc: { likes: -1 },
                $pull: { likedBy: userId }
            });
            console.log('Tweet unliked successfully');
        } else {
            // User hasn't liked the tweet, so like it
            await Tweet.findByIdAndUpdate(tweetId, {
                $inc: { likes: 1 },
                $push: { likedBy: userId }
            });
            console.log('Tweet liked successfully');
        }
    } catch (error) {
        console.error('Error toggling like:', error);
    }

}));

module.exports = router;



