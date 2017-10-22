
// Insert commas as thousands separators 
addCommas = function(n) {
    var rx=  /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function(w){
        while(rx.test(w)){
            w= w.replace(rx, '$1,$2');
        }
        return w;
    });
}

indexApp.controller('bcStatsCtrl', function($scope, $http) {
    var url = "https://api.blockchain.info/stats?cors=true";
    $http.get(url).then( function(response) {
            $scope.marketPrice = addCommas(response.data.market_price_usd);              
            $scope.txPerDay = addCommas(response.data.n_tx);            
    });

    url = "https://api.blockchain.info/charts/avg-block-size?timespan=48hours&cors=true";
    $http.get(url).then( function(response) {
        $scope.blockSize = addCommas(response.data.values[0].y);
    });

    url = "https://api.blockchain.info/charts/mempool-size?cors=true"
    $http.get(url).then( function(response) {
        $scope.mempoolSize = addCommas(response.data.values[1679].y);                      
       
    });

});