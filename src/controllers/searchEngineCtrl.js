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
