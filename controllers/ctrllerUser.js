var app = angular.module('usersApp', []);
app.controller('ctrl_Users', ['$scope', '$http', function($scope, $http) {
    
  console.log("Controller Users operating OK...");

  // Load page and Refresh events
  var refreshPage = function(){
  	//Load areas with ID
  	
  	$http({method:'GET',url:'userList'}).success(function(data,status,headers,config) {
	    console.log('Load & Refresh page');
      	// console.log(data);
	    $scope.Users = data;
	});

  // Start btns 
  $scope.btnSave = true;
  $scope.btnSaveEdit = false;
  $scope.btnCancel = false;
  
  $scope.username = '';
  $scope.type = '';
  }

  refreshPage();


/*
	$http.error(function(data,status,headers,config) {
	   // Hacer algo con el error en status
	   console.log('Error: ' + data + 'Status' + status);
	});
*/


	// Select User
	$scope.selectUser = function(id) {
		$scope.btnSave = false;
		$scope.btnSaveEdit = true;
		$scope.btnCancel = true;

		console.log(id);
		$http({method:'GET',url:'users/' + id}).success(function(user){
			$scope.id = user._id;		
		    $scope.username = user.username;
		    $scope.type = user.type;
		});
	};

	// Btn savEditUser
	$scope.updateUser = function(id, username, type, password){
		console.log("**** Edit save buton working with id User: **** " + id);
		$scope.btnSave = true;
		$scope.btnSaveEdit = false;
		$scope.btnCancel = false;
		
		var User = {
			id: id,
			username: username,
			type: type,
			password: password
		}
		console.log("Updting User Data of ::: " + User.username);

		$http({method:'PUT',url:'users/' + id, headers: {"Content-Type": "application/json;charset=UTF-8"}, data: User }).success(function(user){
			alert("Data updated");
			refreshPage();
		});

	};


	// Btn cancelEditUser
	$scope.cancelEditUser = function(){
		console.log("cancel edit buton working");
		refreshPage();
	};

	$scope.deleteUser = function(id){
		console.log("deleting user " + id);
		$http({method: 'DELETE',url:'users/' + id, return: false}).success(function(user){
			refreshPage();
		})
	}

}]);