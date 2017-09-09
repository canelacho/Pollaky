var app = angular.module('projectsApp', []);
app.controller('ctrl_Projects', ['$scope', '$http', function($scope, $http) {

  console.log("Controller Project operating OK...");

  // DEETE THIS CODE
	// $scope.deleteUser = function(id){
  //
	// 	console.log("deleting user " + id);
	// 	$http({method: 'DELETE',url:'users/' + id, return: false}).success(function(user){
	// 		refreshPage();
	// 	})
	// }

}]);
