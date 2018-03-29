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