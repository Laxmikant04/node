var express = require("express");
var service = require('../services/service.js')
var router = express.Router()


router.post('/adduser',service.addUser)


module.exports = router