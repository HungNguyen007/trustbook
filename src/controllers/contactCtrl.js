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
