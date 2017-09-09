var app = angular.module('activeProjectApp',['ngMaterial']);

app.directive('modalOutletBox',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalOutletBox.html'
    }
})

app.directive('modalLight',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalLight.html'
    }
})

app.directive('modalWindowsCovering',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalWindowsCovering.html'
    }
})

app.directive('modalTemperature',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalTemperature.html'
    }
})

app.directive('modalAudio',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalAudio.html'
    }
})

app.directive('modalVideo',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalVideo.html'
    }
})

app.directive('modalPhone',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalPhone.html'
    }
})

app.directive('modalSurvillance',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalSurvillance.html'
    }
})

app.directive('modalSecurity',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalSecurity.html'
    }
})

app.directive('modalIrrigation',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalIrrigation.html'
    }
})

app.directive('modalPool',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalPool.html'
    }
})

app.directive('modalAppliance',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalAppliance.html'
    }
})

app.directive('modalNetwork',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalNetwork.html'
    }
})

app.directive('modalCore',function(){
    return {
      restrict: 'E',
      controller: 'Ctrl_Active_Project',
      templateUrl: '/modals/modalCore.html'
    }
})

app.controller('Ctrl_Active_Project', ['$scope', '$http', function($scope, $http){

console.log("Controller Active Project operating OK...");


// GET ID PROJECT
var URLactual = window.location.href;
    URLactual = URLactual.split('/');
    last = URLactual.length;
    IDProject = URLactual[last - 1];
// GET ID PROJECT end

// GET PROJECT INFO
var findProjectDevices = function(){
  $http({method:'GET', url:'/app/findActiveProject', params:{id:IDProject} }).success(function(data){
      $scope.dataProject = data;

      // getting Types for filter
      var arrTypes = [];
      arrTypes = data.devices;
      // console.log(JSON.stringify(arrTypes, null, 4));

      newArrType = [];
      arrTypes.forEach(newArrByType);
      function newArrByType(value, index, ar){
        // console.log("value = " + value.deviceType);
        // console.log("index = " + index);
        // console.log("ar = " + ar);
        if(newArrType.indexOf(value.deviceType) == -1){
          newArrType.push(value.deviceType);
        }
      }
      // console.log("New array of types: " + JSON.stringify(newArrType, null, 4));
      // call img for list devices
      // GENERATE FINAL ARRAY FOR TYPES NG_REPEAT
      arrTypeImg = [];
      newArrType.forEach(arrByTypeImg)
      function arrByTypeImg(value, index, ar){
        arrTypeImg.push( { "deviceType" : value, "img" : callIcoDevice(value) } );

        function callIcoDevice(findImg){
          switch (findImg) {
            case "Outle Box":
              img = "crop_square";
              return img;
              break;
            case "Light Control":
              img = "wb_incandescent";
              return img;
              break;
            case "Windows Covering Control":
              img = "brightness_4";
              return img;
              break;
            case "Temperature Control":
              img = "toys";
              return img;
              break;
            case "Audio Control":
              img = "speaker";
              return img;
              break;
            case "Video Control":
              img = "tv";
              return img;
              break;
            case "Phone Control":
              img = "phone";
              return img;
              break;
            case "Survillance Control":
              img = "videocam";
              return img;
              break;
            case "Security Control":
              img = "security";
              return img;
              break;
            case "Irrigation Control":
              img = "local_florist";
              return img;
              break;
            case "Pool Control":
              img = "pool";
              return img;
              break;
            case "Appliance Control":
              img = "devices_other";
              return img;
              break;
            case "Network Control":
              img = "router";
              return img;
              break;
            case "Core Control":
              img = "storage";
              return img;
              break;
            default:
              img = "none";
              console.log("Not img found");
              break;
          }
        }

      }
      $scope.arrayTypes = arrTypeImg;
      // GENERATE FINAL ARRAY FRO TYPES NG_REPEAT end


  });
};
// GET PROJECT INFO end

// AREAS
var refreshAreas = function(){
  $http({method:'GET',url:'/app/findProjectAreas', params:{id:IDProject} }).success(function(data,status,headers,config) {
    console.log('Refreshing Areas');
    $scope.Areas = data;
  });
};

$scope.Areas = refreshAreas();
findProjectDevices();

// Add, Remove, Edit AREAS
$scope.addNewArea = function(areaName, projectId){
  $http({method:'POST',url:'/app/newArea',data:{name:areaName, proj:projectId} }).success(function(data,status,headers,config) {
    if(data){
      console.log('Area saved and ...');
      $scope.areaName = "";
      refreshAreas();
    }else{
      console.log('error saving new Area')
    }
  });
};

$scope.editArea = function(area){
    $scope.btnUpdate = true;
    $scope.btnDelete = true;
    $scope.btnCancel = true;
    console.log('area seleccionada: ' + area);
};
// AREAS end

// Sort Devices by Areas, Type or List
$scope.orderList = "orderArea";
// by default on load page
$scope.SortDevicesHide = true;
$scope.SortDevicesShow = false;
$scope.SortAreasHide = false;
$scope.SortAreasShow = true;
$scope.SortTypesHide = true;
$scope.SortTypesShow = false;

$scope.orderAreas = function(){
  console.log("order by Areas");
  $scope.SortDevicesHide = true;
  $scope.SortDevicesShow = false;
  $scope.SortAreasHide = false;
  $scope.SortAreasShow = true;
  $scope.SortTypesHide = true;
  $scope.SortTypesShow = false;
};

$scope.orderTypes = function(){
  console.log("order by Types");
  $scope.SortDevicesHide = true;
  $scope.SortDevicesShow = false;
  $scope.SortAreasHide = true;
  $scope.SortAreasShow = false;
  $scope.SortTypesHide = false;
  $scope.SortTypesShow = true;
};

$scope.orderDevices = function(){
  console.log("order by Devices");
  $scope.SortDevicesHide = false;
  $scope.SortDevicesShow = true;
  $scope.SortAreasHide = true;
  $scope.SortAreasShow = false;
  $scope.SortTypesHide = true;
  $scope.SortTypesShow = false;
};
// Sort Devices by Areas, Type or List end


// Inc & Dec Qty Bulb
$scope.inc = function(){
  $scope.device.QtyBulbs = $scope.device.QtyBulbs + 1;
  console.log($scope.device.QtyBulbs)
};

$scope.dec = function(){
  if($scope.device.QtyBulbs < 1){
    $scope.msg = "Can't decrement";
    console.log("Can't decrement");
  }else{$scope.device.QtyBulbs = $scope.device.QtyBulbs - 1;
    console.log($scope.device.QtyBulbs)
  }
};
// Inc & Dec Qty Bulb end


// SAVE OUTLET BOX MODAL
$scope.saveOutletBox = function(device){
  // TESTING DATA
  // console.log('inicio save form: ');
  // console.log('0 idproject: ' + $scope.device.idProject);
  // console.log('1 areaLocation: ' + $scope.device.areaLocation);
  // console.log('2 name: ' + $scope.device.name);
  // console.log('3 exist: ' + $scope.device.existing);
  // console.log('4 gangQty: ' + $scope.device.gangQty);
  // console.log('5 wallOrientation: ' + $scope.device.wallOrientation);
  // console.log('6 xPos: ' + $scope.device.xPos);
  // console.log('7 yPos: ' + $scope.device.yPos);
  // console.log('8 observation: ' + $scope.device.observation);

  $http({method:'POST',url:'/app/newOutletBox', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device saved ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      // Close modal
      $('#newOutletBox').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error saving new Device')
    }
  });
};
// SAVE OUTLET BOX MODAL end

// SAVE LIGHTCONTROL MODAL
$scope.device = {};
$scope.device.idProject = IDProject;

$scope.saveLightcontrol = function(device){
  $http({method:'POST',url:'/app/newLightcontrol', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device saved ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      $scope.device.QtyBulbs = 0;
      // Close modal
      $('#newLightControl').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error saving new Device')
    }
  });
};
// SAVE LIGHTCONTROL MODAL end

// SAVE WINDOWS COVERING MODAL
$scope.saveWindowsCoveringControl = function(device){
  $http({method:'POST',url:'/app/newWindowsCoveringControl', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device saved ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      // Close modal
      $('#newWindowsCoveringControl').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error saving new Device')
    }
  });
};
// SAVE WINDOWS COVERING MODAL end

// SAVE TEMPERATURE CONTROL MODAL
$scope.saveTemperatureControl = function(device){
  $http({method:'POST',url:'/app/newTemperatureControl', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device saved ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      // Close modal
      $('#newTemperatureControl').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error saving new Device')
    }
  });
};
// SAVE TEMPERATURE CONTROL MODAL end

// SAVE AUDIO CONTROL MODAL
$scope.saveAudioControl = function(device){
  $http({method:'POST',url:'/app/newAudioControl', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device saved ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      // Close modal
      $('#newAudioControl').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error saving new Device')
    }
  });
};
// SAVE AUDIO CONTROL MODAL end

// SAVE VIDEO CONTROL MODAL
$scope.saveVideoControl = function(device){
  var tagDevice = "Video";
  saveDevice(device,tagDevice);
};
// SAVE VIDEO CONTROL MODAL end

// FUNCTION TO SEND AND RECEIVE DATA FOR SAVE DEVICES
function saveDevice(device,tagDevice){
  $http({method:'POST',url:'/app/new' + tagDevice + 'Control', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device saved ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      // Close modal
      $('#new' + tagDevice + 'Control').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error saving new Device')
    }
  });
};
// FUNCTION TO SEND AND RECEIVE DATA FOR SAVE DEVICES end




// EDIT DEVICE
$scope.selectProject = function(idDevic, idProj, DevicCollection){
  var idDevic = idDevic;
      idProj = idProj;
      DevicCollection = DevicCollection;
      console.log("Editanto ando " + idDevic + ' - ' + idProj + ' - ' + DevicCollection);
};
// EDIT DEVICE end

// REMOVE DEVICES
$scope.removeDeviceProjectCollection = function(idDevic, idProj, DevicCollection){
  var idDevic = idDevic;
      idProj = idProj;
      DevicCollection = DevicCollection;
      console.log(idDevic + ' - ' + idProj + ' - ' + DevicCollection);
  $http({method:'GET', url:'/app/removeDeviceProjectCollection', params:{"idDevic":idDevic, "idProj":idProj, "DevicCollection":DevicCollection} })
  .success(function(data, status, headers, config){
    findProjectDevices();
    console.log('Remove success!!!');
  });
};
// REMOVE DEVICES end



}]);
