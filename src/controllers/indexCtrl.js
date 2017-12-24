indexApp.config(function($routeProvider) {
    $routeProvider
    .when("/prvK2WIF", {
        templateUrl : "PrvK2WIF_Main_SPA.html"
    })
    .when("/bcStatsPage", {
        templateUrl : "bcStatsPage.html"
    })
    .when("/bcCalculator", {
        templateUrl : "bcCalculator.html"
    })
    .when("/bcAddTest", {
        templateUrl : "bcAddGen.html"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/brainW", {
        templateUrl : "brainWallet.html"
    })
    .when("/hdWallet", {
        templateUrl : "bcHDWallet.html"
    })
    .when("/contact", {
        templateUrl : "contact.html"
    })
});