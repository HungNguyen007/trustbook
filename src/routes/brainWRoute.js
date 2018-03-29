var express = require('express')
var router = express.Router()
var brainWTest = require('../brainWTest')
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


router.post('/bwConvert', upload.array(), function (req, res, next) {

    var response = brainWTest.BC_ConvertSecretPhr2Add(req.body.secretPhr);
    res.setHeader('content-type', 'application/json');
    res.end(response);
})

module.exports = router;
