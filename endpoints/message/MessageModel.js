const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

MessageSchema = new mongoose.Schema({
    forumID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Forum"
    },
    messageTitle: {
        type: String,
    },
    messageText: {
        type: String,
    },
    createdBy: { 
        type: Schema.Types.ObjectId, ref: 'User' 
    },
});

 module.exports = mongoose.model("Message", MessageSchema);
