/**
 * Created by hung on 30/07/2017.
 */

var express = require('express')
var app = express();
var router = express.Router()
var addTest = require('../BC_AddTest')
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

router.get('/addTestRandom', function (req, res) {
    // Prepare output
    var response = addTest.BC_RandomAddForm();
    res.setHeader('content-type', 'application/json');
    res.end(response);
})

router.post('/addTestConvert', upload.array(), function (req, res, next) {

    var response = addTest.BC_ConvertPrvKey2Add(req.body.prvkey);

    res.setHeader('content-type', 'application/json');
    res.end(response);
})

module.exports = router;
