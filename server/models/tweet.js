const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const User = require('./user');
const Comment = require('./comment');


// Joi schema for image url validation
const imageSchema = Joi.string().uri({
    scheme: [
        'http',
        'https'
    ]
}).required();

// Custom validator function using Joi
const imageValidator = (value) => {
    if (!value) {
        // Allow empty values
        return true;
    }
    const { error } = imageSchema.validate(value);
    if (error) {
        throw new Error('Invalid image URL. Please provide a valid HTTP or HTTPS URL for the image.');
    }
    return true;
};

// Tweet Schema
const tweetSchema = new Schema({
    text: {
        type: String,
        required: function () {
            // 'this' refers to the document being validated
            return !this.image;
        }
    },
    image: {
        type: String,
        required: function () {
            // 'this' refers to the document being validated
            return !this.text;
        },
        validate: {
            validator: imageValidator
        }
    },
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date/time when a tweet is created
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

//delete all tweet and comments
tweetSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        });
    }
});


// Create models for Tweet schema
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = { Tweet };
