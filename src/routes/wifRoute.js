/**
 * Created by hung on 15/07/2017.
 */

var express = require('express')
var app = express();
var router = express.Router()
var prvK2WIF = require('../BitCoin_PrvKey2WIF')
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


router.get('/PrvK2WIF_Main_SPA.html', function (req, res) {
    res.sendFile("/PrvK2WIF_Main_SPA.html");
})

router.get('/randomOK', function (req, res) {
    // Prepare output
    var response = prvK2WIF.createRandomPrvKey();

    res.setHeader('content-type', 'application/json');
    res.end(response)
})

router.post('/convert', upload.array(), function (req, res, next) {
    var response = prvK2WIF.convertPrvKey2WIF(req.body.prvkey);

    res.setHeader('content-type', 'application/json');
    res.end(response)
})

module.exports = router;
