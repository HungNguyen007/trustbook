var indexApp = angular.module("indexApp", ["ngRoute"]);

indexApp.controller('bcAddTestCtrl', function($scope, $http) {
        
        $scope.prvKey = "EFDB5561A77A23159C7D2BC6FB1861F083E19D4620AFC0F7F962D628FB5E7797";
        $scope.pubKey = "0422B46E8224C181C588DDFAE6D4C4566B01F62E449985064803C0992821754F9A2E98A2C2D8763670F43DA6F8CDAB3382C814C889DD044C83F4F124D652D15B93";
        $scope.firstSHA256 = "882B55EFC6FCBDFB25483F54EFC0F64213B9C0500923FEAF4473E70BE6F9D414";
        $scope.RIPEMD160 = "CBBC218B2FE0A3CF6EED9319F97D45CEA1A16099";
        $scope.netByte = "00CBBC218B2FE0A3CF6EED9319F97D45CEA1A16099";
        
        $scope.secondSHA256 = "31D68068DC4B2C0587B8C4A61503718035EA4A80B2203E56A0238A7E033D200A";

        $scope.thirdSHA256 = "7D17B1FC4D4134A05032556931FE340A5590611EDD97CBDD9D99E2F35526ADE3" ;

        $scope.CKHSUM = "7D17B1FC";

        $scope.fullAddress = "00CBBC218B2FE0A3CF6EED9319F97D45CEA1A160997D17B1FC";

        $scope.address = "1KaFYWrU6teVbmxjz9GsjvhKhEWP7pDvgb";

        var config = {
                headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                }
        }
        $scope.bcAddTestRandom = function() {
                var url = "/addTestRandom";
                $http.get(url, config).then( function(response) {
                        $scope.prvKey = response.data.prvKey;
                        $scope.pubKey = response.data.pubKey;
                        $scope.firstSHA256 = response.data.firstSHA256;
                        $scope.RIPEMD160 = response.data.RIPEMD160;
                        $scope.netByte = response.data.netByte;
                        $scope.secondSHA256 = response.data.secondSHA256;
                        $scope.thirdSHA256 = response.data.thirdSHA256;
                        $scope.CKHSUM = response.data.CKHSUM;
                        $scope.fullAddress = response.data.fullAddress;
                        $scope.address = response.data.address;
                });
        }
        
        $scope.bcAddTestConvert = function() {
                var url = "/addTestConvert";
                var data = JSON.stringify({prvkey: $scope.prvKey});
                
                $http.post(url, data, config).then( function(response) {
                        $scope.prvKey = response.data.prvKey;
                        $scope.pubKey = response.data.pubKey;
                        $scope.firstSHA256 = response.data.firstSHA256;
                        $scope.RIPEMD160 = response.data.RIPEMD160;
                        $scope.netByte = response.data.netByte;
                        $scope.secondSHA256 = response.data.secondSHA256;
                        $scope.thirdSHA256 = response.data.thirdSHA256;
                        $scope.CKHSUM = response.data.CKHSUM;
                        $scope.fullAddress = response.data.fullAddress;
                        $scope.address = response.data.address;               
                });
        }    
});
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

indexApp.controller('brainWalletCtrl', function($scope, $http) {
    
    $scope.secretPhr = "correct horse battery staple";
    $scope.prvKey = "C4BBCB1FBEC99D65BF59D85C8CB62EE2DB963F0FE106F483D9AFA73BD4E39A8A";
    $scope.address = "1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T";

    var config = {
            headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
            }
    }
    $scope.bwConvert = function() {
        var url = "/bwConvert";
        var data = JSON.stringify({secretPhr: $scope.secretPhr});
        $http.post(url, data, config).then( function(response) {
            $scope.secretPhr = response.data.secretPhr;
            $scope.prvKey = response.data.prvKey;
            $scope.address = response.data.address;
        });
    }
     
});
indexApp.config(function($routeProvider) {
        $routeProvider
        .when("/prvK2WIF", {
            templateUrl : "PrvK2WIF_Main_SPA.html"
        })
        .when("/bcStatsPage", {
            templateUrl : "bcStatsPage.html",
        })
        .when("/bcCalculator", {
            templateUrl : "bcCalculator.html",
        })
        .when("/bcAddTest", {
            templateUrl : "bcAddGen.html",
        })
        .when("/about", {
            templateUrl : "about.html",
        })
        .when("/brainW", {
            templateUrl : "brainWallet.html",
        })
});
indexApp.controller('prk2WifCtrl', function($scope) {
    $scope.prvKey = "0C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D";
    $scope.extPrvKey = "800C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D";
    $scope.firstSHA256 = "8147786C4D15106333BF278D71DADAF1079EF2D2440A4DDE37D747DED5403592";
    $scope.secondSHA256 = "507A5B8DFED0FC6FE8801743720CEDEC06AA5C6FCA72B07C49964492FB98A714" ;
    $scope.CKHSUM = "507A5B8D";
    $scope.extPrKeyCKHSUM = "800C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D507A5B8D";
    $scope.wif = "5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ";
});



indexApp.controller('prK2WifRandomCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.prvK2WifRandom = function() {
                var url = "/randomOK";
                $http.get(url).then( function(response) {
                        $scope.prvKey = response.data.prvKey;
                        $scope.extPrvKey = response.data.extPrvKey;                
                        $scope.firstSHA256 = response.data.firstSHA256;              
                        $scope.secondSHA256 = response.data.secondSHA256;            
                        $scope.CKHSUM = response.data.CKHSUM;           
                        $scope.extPrKeyCKHSUM = response.data.extPrKeyCKHSUM;             
                        $scope.wif = response.data.wif;                
                });
        }
        
        $scope.prvK2WifConvert = function() {
                var url = "/convert";
                var data = JSON.stringify({prvkey: $scope.prvKey});
                
                $http.post(url, data).then( function(response) {
                        $scope.prvKey = response.data.prvKey;
                        $scope.extPrvKey = response.data.extPrvKey;                
                        $scope.firstSHA256 = response.data.firstSHA256;              
                        $scope.secondSHA256 = response.data.secondSHA256;            
                        $scope.CKHSUM = response.data.CKHSUM;           
                        $scope.extPrKeyCKHSUM = response.data.extPrKeyCKHSUM;             
                        $scope.wif = response.data.wif;                
                });
        }    
}]);