indexApp.config(function($routeProvider) {
        $routeProvider
        .when("/prvK2WIF", {
            templateUrl : "PrvK2WIF_Main_SPA.html"
        })
        .when("/bcStatsPage", {
            templateUrl : "bcStatsPage.html",
            controller : "bcStatsCtrl"
        })
        .when("/bcCalculator", {
            templateUrl : "bcCalculator.html",
            controller : "bcCalCtrl"
        })
        .when("/bcAddTest", {
            templateUrl : "bcAddGen.html",
            controller : "bcAddTestCtrl"
        })

});