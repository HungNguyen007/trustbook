indexApp.controller('bcCalCtrl', function($scope, $http, $timeout) {

    var resourceLock = "";

    $http.get("https://blockchain.info/ticker?cors=true").then(function(response) {
        resourceLock = "toFiatMoney";
        $scope.fiatValue = parseFloat(response.data.USD.last);
        $scope.bcValue = 1;
        $scope.currency = "USD";
        $scope.bcType = "BTC";
        
    });

    $scope.toBtc = function() {
        resourceLock = "toBtc";

        url = "https://blockchain.info/tobtc";
        currency = "currency=" + $scope.currency;

        /* Clear non numeric value */
        regex = /[^0-9.\/]/g;
        fiatValue = $scope.fiatValue = String($scope.fiatValue).replace(regex, '');
        fiatValueQuery = "value=" + fiatValue;
        bcType =  $scope.bcType;
        url = url + "?" + "cors=true" + "&" + currency + "&" + fiatValueQuery;
        
        if(fiatValue ) {
            $http.get(url).then(function(response) {
                switch(bcType) {
                    case "mBTC":
                        $scope.bcValue = parseFloat(response.data) * 1000;
                        break;
                    case "uBTC":
                        $scope.bcValue = parseFloat(response.data) * Math.pow(10,6);
                        break;
                    default:
                        $scope.bcValue = parseFloat(response.data);
                };
            });
        } else { $scope.bcValue = "0";}
    };

    $scope.toBtcDelay = function() {
        $timeout(function() { 
            $scope.toBtc();}, 400);
    };
    
    $scope.toFiatMoney = function() {
        resourceLock = "toFiatMoney";

        url = "https://blockchain.info/ticker?cors=true";
        currency = $scope.currency;
        fiatValue = $scope.fiatValue;
        bcType =  $scope.bcType;
        bcValue = $scope.bcValue;

        /* Clear non numeric value */
        regex = /[^0-9.\/]/g;;
        bcValue = $scope.bcValue = String(bcValue).replace(regex, '');

        if(bcValue < 0) {bcValue = $scope.bcValue = Math.abs(bcValue)}  

        $http.get(url).then(function(response) {
            switch(bcType) {
                case "mBTC":
                    bcValue = bcValue/1000;
                    break;
                case "uBTC":
                    bcValue = bcValue / Math.pow(10,6);
                    break;
                default:
            };

            switch(currency) {
                case "USD":
                    $scope.fiatValue = bcValue * response.data.USD.last;
                    break;
                case "EUR":
                    $scope.fiatValue = bcValue * response.data.EUR.last;
                    break;
                case "GBP":
                    $scope.fiatValue = bcValue * response.data.GBP.last;
                    break;
                case "JPY":
                    $scope.fiatValue = bcValue * response.data.JPY.last;
                    break;
                case "AUD":
                    $scope.fiatValue = bcValue * response.data.AUD.last;
                    break;
                case "CNY":
                    $scope.fiatValue = bcValue * response.data.CNY.last;
                    break;
                case "SGD":
                    $scope.fiatValue = bcValue * response.data.SGD.last;
                    break;
                default:
            };
            
        });
    };

    $scope.selectConverter = function() {
        if (resourceLock === "toFiatMoney")
        {
            $scope.toFiatMoney();
        }
        else $scope.toBtcDelay();
    }
      
});

