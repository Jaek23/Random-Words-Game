const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required:true, 
        unique:true,
    },
    email: {
        type:String,
        required:true, 
        unique:true,
    },
    password: {
        type:String,
        required:true, 
    },
    correctWordCount: {
        type: Number,
        default:0,
    },
    highScores:[
        {
            score: Number,
            date: Date,
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;