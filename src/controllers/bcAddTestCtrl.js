
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