
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