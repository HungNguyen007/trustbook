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
