/**
 * Created by hung on 08/07/2017.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const wifRoute = require('./src/routes/wifRoute');
const addTestRoute = require('./src/routes/addTestRoute');
var http = require("http");

setInterval(function() {
    http.get("https://polar-fjord-45848.herokuapp.com/");
}, 300000); // every 5 minutes (300000)

//Small check for OpenShift's Node.js
var server_port = process.env.PORT || 8080
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// Serving Static Files
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src/app')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'src/controllers')));
app.use(express.static(path.join(__dirname, 'src/util')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Serving routing path
app.use(wifRoute);
app.use(addTestRoute);


var server = app.listen(server_port, function () {
    var port = server.address().port
    console.log("Bitcoin app listening on port %s", port)
})
