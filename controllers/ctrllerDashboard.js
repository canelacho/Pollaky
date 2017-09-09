var app = angular.module('dashboarApp', []);
app.controller('ctrl_Project_List', ['$scope', '$http', '$window', function($scope, $http, $window) {
  
console.log("Controller DashBoard operating OK...");

var refreshPage = function(){
  $http({method:'GET',url:'projectList'}).success(function(data,status,headers,config) {  
    $scope.Projects = data;
    console.log('Project List: ' + data);
  });
};


// DELET PROEJECT
$scope.deleteProject = function(id){
    console.log("Deleting Project " + id);
    $http({method: 'DELETE',url:'project/' + id, return: false}).success(function(project){
      refreshPage();
    });
};

$scope.deactivateProject = function(idProjSelect, avaliableStatus){
  console.log("Deactivating Project" + idProjSelect + ' y avaliable status: ' + avaliableStatus);

  if(avaliableStatus === true){
    console.log('SI fue que paso: ' + avaliableStatus);
    $http({method: 'GET',url:'deactivateprojectTrue/', params:{'idPrj': idProjSelect, 'status': avaliableStatus}, return: false}).success(function(deactivateProject){
      refreshPage(); 
    });
  } 

  if(avaliableStatus === false) {
    console.log('NO paso: ' + avaliableStatus);
    $http({method: 'GET',url:'deactivateprojectFalse/', params:{'idPrj': idProjSelect, 'status': avaliableStatus}, return: false}).success(function(deactivateProject){
      //console.log('****** whats here: ' + deactivateProject);
      refreshPage(); 
    });
  };

  // $http({method: 'GET',url:'deactivateproject/', params:{'idPrj': idProjSelect, 'status': test}, return: false}).success(function(deactivateProject){
  //   console.log('****** whats here: ' + deactivateProject);
  //   refreshPage(); 
  // });
};

refreshPage();

}]);