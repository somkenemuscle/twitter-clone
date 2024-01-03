const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

// User Schema
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }, 
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date/time when a tweet is created
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;