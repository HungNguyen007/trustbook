/**
 * Created by hung on 28/12/2017.
 */

var express = require('express')
var router = express.Router()
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

router.get('/', function (req, res) {
    res.sendFile("/index.html");
})

module.exports = router;