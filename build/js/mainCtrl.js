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
		headers: {'Content-Type': 'application/json; charset=UTF-8'}
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

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("BCaddress"), ['indexApp']); });
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

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("bcCal"), ['indexApp']); });
indexApp.controller('bcHDWalletCtrl', function($scope, $http) {
    
    $scope.bip32_source_passphrase = 'crazy horse battery staple'
    $scope.gen_from_msg = "Your passphrase is hashed using 50,000 rounds of HMAC-SHA256";
    $scope.bip32SourceKey = 'xprv9s21ZrQH143K2ACVZeZKn3jMXSiwVnwzbkgbhcaJkBRLtxg2RpqRpJF5ANiQstKwgkhHSvaY3iKpnEMvfNMkGkFma3n8hyuACKFfA635qBm';
    $scope.version = '0x0488ade4'
    $scope.depth = '0'
    $scope.fingerPrint = '0'
    $scope.childIndex = '0'
    $scope.chainCode = '0a1dd37e6e3dcff6a7b225cee55878a4ff30e7d922c9d705704518a0a65c1d70'
    $scope.bip32KeyInfoKey = 'L5C5bcXvr5Yb87mCqyoZ981VpnuNQ39hgZg1nLfvWe7NgKXRwQne'
    $scope.bip32_custom_path = "m/0'/1/2'/2"
    $scope.derived_private_key = 'xprvA1wyuhmcxqBVBe7QxRYNAY4NfPk68iiQYiMkoLRhbG3GBnwXUxTkiAMVF5NSZoc9GRDPYRLjE9ebZHjnA5tSthG6o2BHvULbVUq9eGai5zN'
    $scope.derived_wif = 'L4eKxppsa5Pk2VPUZzyxon2NaRFHaCoPhFPDnFGvXCSkSWYewWTh'
    $scope.derived_public_key = 'xpub6EwLKDJWoCjnQ8Bt4T5NXg17DRaaYBSFuwHMbiqK9baF4bGg2Vn1Fxfy6L11c9gYKBhKSveA8aghYvHGeiymLbtmvEeFGCSTTQr44thBArP'
    $scope.derived_public_key_hex = '02a8dade87bfbb1aec0136a10e2fdc2f07fe9232141f6337684ff39a4e995eef73'
    $scope.addr = '1DKfqyQf3hCpqkiGvFituVajC1osNpH6dx'
    $scope.qrCode = '1DKfqyQf3hCpqkiGvFituVajC1osNpH6dx'
    $scope.qrShortDesc = '1DKfqyQf3hCpqkiGvFituVajC1osNpH6dx'

    $scope.truefalse = true
    $scope.bPassPhrase = false
    $scope.bCustomePath = false
    $scope.bAccount = true
    $scope.bKeypairIndex = true
    $scope.bip32_derivation_path = "custom"
    
    $scope.hdWalletGen = function() {
        var url = "/hdWalletGen";
        var data = JSON.stringify({bip32SourceKey: $scope.bip32SourceKey});
        var config = {
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }
        
        $http.post(url, data, config).then( function(response) {
            $scope.bip32SourceKey = response.data.bip32SourceKey;
            $scope.version = response.data.version;
            $scope.depth = response.data.depth;
            $scope.fingerPrint = response.data.fingerPrint;
            $scope.childIndex = response.data.childIndex;
            $scope.chainCode = response.data.chainCode
            $scope.bip32KeyInfoKey = response.data.bip32KeyInfoKey               
        });
        $scope.derivedHDWalletGen()     
    }

    $scope.derivedHDWalletGen = function() {
        var url = "/derivedHDWalletGen";
        var data = JSON.stringify({
            bip32SourceKey: $scope.bip32SourceKey,
            bip32_custom_path: $scope.bip32_custom_path
        });
        var config = {
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }
        
        $http.post(url, data, config).then( function(response) {
            $scope.derived_private_key = response.data.derived_private_key;
            $scope.derived_wif = response.data.derived_wif;
            $scope.derived_public_key = response.data.derived_public_key;
            $scope.derived_public_key_hex = response.data.derived_public_key_hex;
            $scope.addr = response.data.addr
            $scope.qrShortDesc = response.data.addr
            $scope.qrCode = response.data.addr
            
        });      
    }

    $scope.checkboxShowPassphrase = function() {
        if($scope.checkbox_show_passphrase) {
            document.getElementById('bip32_source_passphrase').type = 'text'
        }
        else {
            document.getElementById('bip32_source_passphrase').type = 'password'
        }     
    }

    $scope.updateGenFrom = function() {
        if($scope.gen_from === "passphrase") {
            $scope.truefalse = true
            $scope.bPassPhrase = false
            $scope.gen_from_msg = "Your passphrase is hashed using 50,000 rounds of HMAC-SHA256"
        }
        else {
            $scope.truefalse = false
            $scope.bPassPhrase = true
            $scope.gen_from_msg = "You can manually enter an Extended Private or Public key"
        }
    }
    
    $scope.hdKeyGenFromPass = function() {
        var url = "/hdKeyGenFromPass";
        var config = {
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }

        var data; 
        switch($scope.bip32_derivation_path){
            case "m" :
                data = JSON.stringify({
                    bip32_source_passphrase: $scope.bip32_source_passphrase,
                    bip32_derivation_path: $scope.bip32_derivation_path
                });
                break;
            case "m/i":
                data = JSON.stringify({
                    bip32_source_passphrase: $scope.bip32_source_passphrase,
                    bip32_derivation_path: $scope.bip32_derivation_path,
                    keypair_index: $scope.keypair_index
                });
                break;
            case "m/k'/0", "m/k'/1":
                data = JSON.stringify({
                    bip32_source_passphrase: $scope.bip32_source_passphrase,
                    bip32_derivation_path: $scope.bip32_derivation_path,
                    account_index: $scope.account_index
                });
                break;
            case "m/k'/0/i", "m/k'/1/i":
                data = JSON.stringify({
                    bip32_source_passphrase: $scope.bip32_source_passphrase,
                    bip32_derivation_path: $scope.bip32_derivation_path,
                    account_index: $scope.account_index,
                    keypair_index: $scope.keypair_index
                });
                break;
           
            default:
                data = JSON.stringify({
                    bip32_source_passphrase: $scope.bip32_source_passphrase,
                    bip32_derivation_path: $scope.bip32_derivation_path,
                    bip32_custom_path: $scope.bip32_custom_path
                });
                break;
        }
         
        $http.post(url, data, config).then( function(response) {
            $scope.bip32_source_passphrase = response.data.bip32_source_passphrase;
            $scope.bip32SourceKey = response.data.bip32SourceKey;
            $scope.version = response.data.version;
            $scope.depth = response.data.depth;
            $scope.fingerPrint = response.data.fingerPrint;
            $scope.childIndex = response.data.childIndex;
            $scope.chainCode = response.data.chainCode
            $scope.bip32KeyInfoKey = response.data.bip32KeyInfoKey
        });

        $scope.derivedHDWalletGen()
    }

    $scope.selectDerivedPath = function() {
        switch($scope.bip32_derivation_path){
            case "m" :
                $scope.bCustomePath = true
                $scope.bAccount = true
                $scope.bKeypairIndex = true
                break;
            case "m/i":
                $scope.bCustomePath = true
                $scope.bAccount = true
                $scope.bKeypairIndex = false
                break;
            case "m/k'/0":
                $scope.bCustomePath = true
                $scope.bAccount = false
                $scope.bKeypairIndex = true
                break;
            case "m/k'/0/i":
                $scope.bCustomePath = true
                $scope.bAccount = false
                $scope.bKeypairIndex = false
                break;
            case "m/k'/1":
                $scope.bCustomePath = true
                $scope.bAccount = false
                $scope.bKeypairIndex = true
                break;
            case "m/k'/1/i":
                $scope.bCustomePath = true
                $scope.bAccount = false
                $scope.bKeypairIndex = false
                break;
            default:
                $scope.bCustomePath = false
                $scope.bAccount = true
                $scope.bKeypairIndex = true
                break;
        }
         
    }

    /**************************************************
    To show or hide the password use a custom directive:
    
    app.directive("showPassword", function() { 
        return function linkFn(scope, elem, attrs) {
            scope.$watch(attrs.showPassword, function(newValue) {
                if (newValue) {
                    elem.attr("type", "text");
                } else {
                    elem.attr("type", "password");
                };
            });
        };
    });
    
    Usage
    
     <input type=password show-password="showPassword" 
            ng-model="thePassword">
    
    The show-password directive watches the defined scope variable and changes the input to type=text when truthy and back to type=password when falsey.
    ***************************************************/

});

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("HDWallet"), ['indexApp']); });

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
indexApp.controller('brainWalletCtrl', function($scope, $http) {
    
    $scope.secretPhr = "correct horse battery staple";
    $scope.prvKey = "C4BBCB1FBEC99D65BF59D85C8CB62EE2DB963F0FE106F483D9AFA73BD4E39A8A";
    $scope.address = "1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T";

    var config = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
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

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("brainWallet"), ['indexApp']); });
indexApp.controller('contactCtrl', function($scope, $http) {

    $scope.messageConfirm = "";
    
    var config = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }
    
    $scope.contactSubmit = function() {
        var url = "/contactSubmit";
        var data = JSON.stringify({
            name: $scope.name,
            email: $scope.email,
            comment: $scope.comment
        });
        $http.post(url, data, config).then( function(response) {
            if(response.yo != "error") {
                $scope.name = ""
                $scope.email = ""
                $scope.comment = ""
                $scope.messageConfirm = "Thank you for your message, we will contact you soon."
            }
            else{
                $scope.messageConfirm = "Opps, we got some issues. Please try to send again your message."
            }
            
        });
    }
     
});

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("contact"), ['indexApp']); });

// indexApp.config(function($routeProvider) {
//     $routeProvider
    // .when("/prvK2WIF", {
    //     templateUrl : "PrvK2WIF_Main_SPA.html"
    // })
    // .when("/bcStatsPage", {
    //     templateUrl : "bcStatsPage.html"
    // })
    // .when("/bcCalculator", {
    //     templateUrl : "bcCalculator.html"
    // })
    // .when("/bcAddTest", {
    //     templateUrl : "bcAddGen.html"
    // })
    // .when("/about", {
    //     templateUrl : "about.html"
    // })
    // .when("/brainW", {
    //     templateUrl : "brainWallet.html"
    // })
    // .when("/hdWallet", {
    //     templateUrl : "bcHDWallet.html"
    // })
    // .when("/contact", {
    //     templateUrl : "contact.html"
    // })
// });

// searchApp.config(function($routeProvider) {
//     $routeProvider
//     .when("/searchEngineCtrl", {
//         templateUrl : "searchPage.html"
//     })
// })
indexApp.controller('prk2WifCtrl', function($scope) {
    $scope.prvKey = "0C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D";
    $scope.extPrvKey = "800C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D";
    $scope.firstSHA256 = "8147786C4D15106333BF278D71DADAF1079EF2D2440A4DDE37D747DED5403592";
    $scope.secondSHA256 = "507A5B8DFED0FC6FE8801743720CEDEC06AA5C6FCA72B07C49964492FB98A714" ;
    $scope.CKHSUM = "507A5B8D";
    $scope.extPrKeyCKHSUM = "800C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D507A5B8D";
    $scope.wif = "5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ";
});

//To render second app in one page
angular.element(document).ready(function() {angular.bootstrap(document.getElementById("wif"), ['indexApp']); });
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

searchApp.controller('searchEngineCtrl', ['$scope', '$window', '$location', '$http', '$route', function($scope, $window, $location, $http, $route) {
	
	$scope.searchEngineFirer = function() {
		$location.path('/searchPage.html').search({keyword:  $scope.keyWords});
		url = $location.url();
		$window.location.href = url;

	}    
}]);

searchApp.controller('searchResultCtrl',['$scope', '$location', function($scope, $location) {
	$scope.searchQuery = $location.search().keyword;

}])
