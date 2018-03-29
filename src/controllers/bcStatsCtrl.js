indexApp.controller('bcStatsCtrl', function($scope, $http) {
    var url = "https://api.blockchain.info/stats?cors=true";
    $http.get(url).then( function(response) {
            $scope.marketPrice = validDigits(addCommas(response.data.market_price_usd), 2);              
            $scope.txPerDay = addCommas(response.data.n_tx);            
    });

    url = "https://api.blockchain.info/charts/avg-block-size?timespan=48hours&cors=true";
    $http.get(url).then( function(response) {
        $scope.blockSize = validDigits(addCommas(response.data.values[0].y), 2);
    });

    url = "https://api.blockchain.info/charts/mempool-size?cors=true"
    $http.get(url).then( function(response) {
        $scope.mempoolSize = addCommas(response.data.values[1679].y);
    });

});

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("bcStats"), ['indexApp']); });