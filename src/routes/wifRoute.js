/**
 * Created by hung on 15/07/2017.
 */

var express = require('express')
var app = express();
var router = express.Router()
var prvK2WIF = require('../BitCoin_PrvKey2WIF')
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data



// router.get('/', function (req, res) {
//     // Prepare output
//     res.sendFile("/index.html");
// })

// router.get('/PrvK2WIF_Main_SPA.html', function (req, res) {
//     // Prepare output
//     console.log("Hello PrvK2WIF_Main_SPA.html")
//     res.sendFile("/PrvK2WIF_Main_SPA.html");
// })

// router.get('/PrvK2WIF_Random_SPA.html', function (req, res) {
//     // Prepare output
    
//     res.sendFile("/PrvK2WIF_Random_SPA.html");
// })

// router.get('/app.min.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/app.min.js");
// })

// router.get('/BitCoin_PrvKey2WIF-obfuscated.min.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/BitCoin_PrvKey2WIF-obfuscated.min.js");
// })
/**************************************************/
// router.get('/indexApp.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/indexApp.js");
// })

// router.get('/indexCtrl.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/indexCtrl.js");
// })

/**************************************************/
// router.get('/randomApp.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/randomApp.js");
// })

// router.get('/randomCtrl.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/randomCtrl.js");
// })

// router.get('/convertCtrl.js', function (req, res) {
//     // Prepare output
//     res.sendFile("/convertCtrl.js");
// })

/**************************************************/
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
