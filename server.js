/**
 * Created by hung on 08/07/2017.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const wifRoute = require('./src/routes/wifRoute');
const addTestRoute = require('./src/routes/addTestRoute');
const brainWRoute = require('./src/routes/brainWRoute');
const hdWalletRoute = require('./src/routes/hdWalletRoute');

var http = require("http");

setInterval(function() {
    http.get("http://www.trustbook.info");
}, 300000); // every 5 minutes (300000)

//Small check for OpenShift's Node.js
var server_port = process.env.PORT || 8080

// Serving Static Files
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src/app')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'build/js')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'src/util')));
app.use(express.static(path.join(__dirname, 'build/images')));
app.use(express.static(path.join(__dirname, 'node_modules/qrcode-generator')));
app.use(express.static(path.join(__dirname, 'node_modules/angular-qrcode')));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Serving routing path
app.use(wifRoute);
app.use(addTestRoute);
app.use(brainWRoute);
app.use(hdWalletRoute);

var server = app.listen(server_port, function () {
    var port = server.address().port
    console.log("Blockchain app is listening on port %s", port)
})
