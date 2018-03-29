var indexApp = angular.module("indexApp", ['monospaced.qrcode']);
var searchApp = angular.module("searchApp", ['ngRoute']);
searchApp.config(function($locationProvider) {
    var mode = {
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    }
    $locationProvider.html5Mode(mode)
})

