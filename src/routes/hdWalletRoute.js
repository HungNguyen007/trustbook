var express = require('express')
var router = express.Router()
var hdWallet = require('../BC_HDWalletTest')
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


router.post('/hdWalletGen', upload.array(), function (req, res) {
    var response = hdWallet.hdWalletGen(req.body.bip32SourceKey);

    res.setHeader('content-type', 'application/json');
    res.end(response)
})

router.post('/derivedHDWalletGen', upload.array(), function (req, res) {
    var response = hdWallet.derivedHDWalletGen(req.body.bip32SourceKey, req.body.bip32_custom_path);

    res.setHeader('content-type', 'application/json');
    res.end(response)
})

router.post('/hdKeyGenFromPass', upload.array(), function (req, res) {
    var response = hdWallet.hdKeyGenFromPass(req.body.bip32_source_passphrase);
    res.setHeader('content-type', 'application/json');
    res.end(response)
})
module.exports = router;

