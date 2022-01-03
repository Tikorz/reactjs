var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Message = require('./MessageModel');
var MessageService = require('./MessageService');
const verifyToken = require('../middleware/verifyToken');



router.get('/',MessageService.getMessages)

router.post("/",verifyToken,MessageService.create);

router.put('/',verifyToken,MessageService.update);

router.post('/getByForumID',verifyToken,MessageService.getByOwnerID);

router.get('/getByForumID',verifyToken,MessageService.getByToken);

router.delete('/', verifyToken,MessageService.delete);



module.exports = router;