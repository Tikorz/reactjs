const MessageModel = require('../message/MessageModel');
const Message = require('../message/MessageModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.getMessages = function(req, res){
    Message.find(function(err, Message){
        if(err){
            throw err;
        }
        res.json(Message);
    });
};

exports.create = async (req, res) => {
    const message = new Message({
        forumID: req.body.forumID,
        messageTitle: req.body.messageTitle,
        messageText: req.body.messageText,
        createdBy: req.body._id
    });
    message
    .save()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Die Message konnte nicht erstellt werden."
        });
    });
};

exports.getByOwnerID = function (req, res, next) {
    Message.find({messageTitle: req.body.messageTitle})
    .then(doc => {
        if(!doc) { return res.status(400).end();}
        return res.status(200).json(doc);
    })
    .catch(err => next(err));
}

exports.getByToken = async (req, res, next) => {
    Forum.find({ userID: req.token.userID }) 
    .then(doc => {
        if(!doc) { return res.status(400).end();}
        return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }

exports.update = async (req,res) => {
    try {
        const result = await Message.findOneAndUpdate(
            {
                _id: req.body._id,
            },
            {
                messageText: req.body.messageText
            },
            {
                upsert: true,
                new: true
            }
        )
        res.send(result);
    }catch(err){
        res.status(401).json(err);
    }
  }
  
exports.delete = function(req,res){
    var query = {_id: req.body._id};

    Message.remove(query, function(err, Message){
        if(err){
            console.log("Can´t delete: ",err);
        }
        res.json(Message);
    })
};