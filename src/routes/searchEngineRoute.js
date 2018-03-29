/**
 * Created by hung on 30/07/2017.
 */

var express = require('express')
var router = express.Router()
const path = require('path');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


router.get('/searchEngineFirer', function (req, res) {
    console.log("Enter search engine router");
    console.log("Request object is " + req)
    console.log("Query object is " + req.query)
    console.log("req.query.keyword is " + req.query.keyword)
    res.end();
})

module.exports = router;