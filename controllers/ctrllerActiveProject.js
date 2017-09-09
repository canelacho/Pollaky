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
      // GENERATE FINAL ARRAY FOR TYPES NG_REPEAT end

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


// SAVE MODALS
$scope.saveOutletBox = function(device){
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

$scope.saveLightcontrol = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Light");
};

$scope.saveWindowsCoveringControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"WindowsCovering");
};

$scope.saveTemperatureControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Temperature");
};

$scope.saveAudioControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Audio");
};

$scope.saveVideoControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Video");
};

$scope.savePhoneControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Phone");
};

$scope.saveSurvillanceControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Survillance");
};

$scope.saveSecurityControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Security");
};

$scope.saveIrrigationControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Irrigation");
};

$scope.savePoolControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Pool");
};

$scope.saveApplianceControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Appliance");
};

$scope.saveNetworkControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Network");
};

$scope.saveCoreControl = function(device){
  device.idProject = IDProject;
  saveDevice(device,"Core");
};
// SAVE  MODALS end

// FUNCTION TO SEND AND RECEIVE DATA FOR SAVE DEVICES FROM MODALS
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


// FIND ONE DEVICE TO EDIT
$scope.selectProject = function(idDevic, idProj, DevicCollection){
  DevicCollectionElement = DevicCollection.split("");
  DevicCollectionElement.pop();
  DevicCollectionElement = DevicCollectionElement.join("");
  console.log(DevicCollectionElement);
      // find 1 device
      $http({method:'GET', url:'/app/findOneDevice', params:{"idDevic":idDevic, "idProj":idProj, "DevicCollection":DevicCollection} })
      .success(function(data, status, headers, config){
        console.log('Data find!!! : '+JSON.stringify(data, null, 4));
        $scope.device = data;
      });

      $scope.saveBtn = false;
      $scope.updateBtn = true;
      $('#new' + DevicCollectionElement).modal('toggle');

};
// FIND ONE DEVICE TO EDIT



///////// ACA VAN TODOS LOS DEMAS

// UPDATE  MODALS
$scope.updateVideoControl = function(device){
  device.idProject = IDProject;
  console.log("enviando datos para update!!!!"+ device);
  updateDevice(device,"Video");
};
// UPDATE  MODALS end

// FUNCTION TO UPDATE DEVICES FROM MODALS
function updateDevice(device,tagDevice){
  console.log("llegaron los datos" + device + " y tambien el tag: "+  tagDevice);
  $http({method:'POST',url:'/app/update' + tagDevice + 'Control', data:device }).success(function(data,status,headers,config) {
    if(data){
      console.log('Device updated ...');
      $scope.device = {};
      $scope.device.idProject = IDProject;
      // Close modal
      $('#new' + tagDevice + 'Control').modal('toggle');
      //Refresh Devices
      findProjectDevices();
    }else{
      console.log('error updating new Device')
    }
  });
};
// FUNCTION TO SEND AND UPDATE DEVICES FROM MODALS end


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


$scope.Areas = refreshAreas();
$scope.device = {};
$scope.device.idProject = IDProject;
findProjectDevices();

// Clean obj and reCall modal
$scope.clearObjDev = function(){
  $scope.device = {};
  $scope.device.idProject = IDProject;
  $scope.saveBtn = true;
  $scope.updateBtn = false;
  }

$scope.saveBtn = true;
$scope.updateBtn = false;

}]);
