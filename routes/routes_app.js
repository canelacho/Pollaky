var express = require("express");
var router = express.Router();

var User = require('../models/user').User;
var Project = require('../models/project').Project;
var Area = require('../models/area').Area;
var OutletBoxs = require('../models/outletBox').OutletBoxs;
var LightsControls = require('../models/lightsControl').LightsControls;
var WindowsCoveringControls = require('../models/windowsCoveringControl').WindowsCoveringControls;
var TemperatureControls = require('../models/temperatureControl').TemperatureControls;
var AudioControls = require('../models/audioControl').AudioControls;
var VideoControls = require('../models/videoControl').VideoControls;
var PhoneControls = require('../models/phoneControl').PhoneControls;
var SurvillanceControls = require('../models/survillanceControl').SurvillanceControls;
var SecurityControls = require('../models/securityControl').SecurityControls;
var IrrigationControls = require('../models/irrigationControl').IrrigationControls;
var PoolControls = require('../models/poolControl').PoolControls;
var ApplianceControls = require('../models/applianceControl').ApplianceControls;
var NetworkControls = require('../models/networkControl').NetworkControls;
var CoreControls = require('../models/coreControl').CoreControls;


// require to Convert ids into objetId in mongodb querys
var ObjectId = require('mongoose').Types.ObjectId;


/* ------------ ADD DEVICE TO PROJECT ------------ */
var addDeviceToProject = function(idDevic, DevColl, idProj, areaLoc, name, devT, observ ){
Project.update(
    { _id: idProj },
    { $inc: { qntDevices: 1 },
      $push: { devices: { idDevice: idDevic,
                          DevicCollection: DevColl,
                          areaLocation: areaLoc,
                          name: name,
                          deviceType: devT,
                          observation: observ } } },{ upsert: true, multi: false },
    function(err, docs) {
                          if (err) { console.log(err) }
                          else { console.log("Device added to Project"); }
                        });
};
/*------------- ADD DEVICE TO PROJECT end ------------ */

/* ------------ REMOVE DEVICE FROM PROJECT ------------ */
router.get("/removeDeviceProjectCollection", function(req, res){
  var idDevic = req.query.idDevic;
      idProj = req.query.idProj;
      DevicCollection = req.query.DevicCollection;
  console.log("Data to remove: " + idDevic + ' - ' + idProj + ' - ' + DevicCollection);
  // Call function to remove
  removeDeviceProjectCollection(idDevic, idProj, DevicCollection);
  res.send(true);
});
// First Remove Device from Project
var removeDeviceProjectCollection = function(idDevic, idProj, DevicCollection){
  // convert ids into objet id
  var idProj = new ObjectId(idProj);
  var idDevic = new ObjectId(idDevic);

  Project.update({ "_id":idProj },
                 { $inc : { qntDevices: -1 },
                 $pull: { devices: { "idDevice":idDevic } } },
      function(err, doc) {
                            if (err) {console.log('error: ' + err) }
                            else {
                              switch (DevicCollection) {
                              case "OutletBoxs":
                                OutletBoxs.findOne({"_id": idDevic}, function (error, deviceInProject){
                                  console.log("This object will get deleted " + deviceInProject);
                                  deviceInProject.remove();
                                });
                                break;
                              case "LightsControls":
                                LightsControls.findOne({"_id": idDevic}, function (error, deviceInProject){
                                  console.log("This object will get deleted " + deviceInProject);
                                  deviceInProject.remove();
                                });
                                break;
                              case "WindowsCoveringControls":
                                WindowsCoveringControls.findOne({"_id": idDevic}, function (error, deviceInProject){
                                  console.log("This object will get deleted " + deviceInProject);
                                  deviceInProject.remove();
                                });
                                break;
                              case "TemperatureControls":
                                TemperatureControls.findOne({"_id": idDevic}, function (error, deviceInProject){
                                  console.log("This object will get deleted " + deviceInProject);
                                  deviceInProject.remove();
                                });
                                break;
                              default:
                              console.log("Sorry, value not find");
                              break;
                            }

                            console.log("Device removed from Project" + doc | JSON); }

                          }
  );

};
/* ------------ REMOVE DEVICE FROM PROJECT end ------------ */

/* --------- API OUTLET BOX --------- */
router.post("/newOutletBox", function(req, res, next){
  console.log("Start to save New Outlet Box");
  var OutletBox = new OutletBoxs({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    existing: req.body.existing,
    gangQty: req.body.gangQty,
    wallOrientation: req.body.wallOrientation,
    element: req.body.element,
    xPos: req.body.xPos,
    yPos: req.body.yPos,
    observation: req.body.observation
  });

  OutletBox.save().then(function(us) {
    addDeviceToProject(us._id, "OutletBoxs", req.body.idProject, req.body.areaLocation, req.body.name, "Outle Box", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API OUTLET BOX end  --------- */



/* --------- API LIGHT CONTROL --------- */
router.post("/newLightcontrol", function(req, res, next){
	console.log("Start to save New LightControl");
	var LightControl = new LightsControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    type: req.body.type,
    class: req.body.class,
    wallOrientation: req.body.wallOrientation,
    whoProvide: req.body.whoProvide,
    qtyBulbs: req.body.qtyBulbs,
    typeLightBulbs: req.body.typeLightBulbs,
    loadEachBulb: req.body.loadEachBulb,
    observation: req.body.observation
  });

  console.log(LightControl);

	LightControl.save().then(function(us) {
    addDeviceToProject(us._id, "LightsControls", req.body.idProject, req.body.areaLocation, req.body.name, "Light Control", us.observation);
    console.log("Device saved...");
    res.send(true);
	},function(err){
		console.log(String(err));
		res.send("There was a problem while save the data");
	})
});
/* --------- API LIGHT CONTROL end  --------- */


/* --------- API WINDOWS COVERING CONTROL --------- */
router.post("/newWindowsCoveringControl", function(req, res, next){
  console.log("Start to save New Windows Covering Control");
  var WindowsCoveringControl = new WindowsCoveringControls({
    idProyect: req.body.idProyect,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    wallOrientation: req.body.wallOrientation,
    minwindowsWidth: req.body.minwindowsWidth ,
    windowsHeight: req.body.minwindowsHeight,
    windowsDepth: req.body.windowsDepth,
    motorPosition: req.body.motorPosition,
    ankled: req.body.ankled,
    depthPosition: req.body.depthPosition,
    fabric: req.body.fabric,
    observation: req.body.observation
  });

  WindowsCoveringControl.save().then(function(us) {
    addDeviceToProject(us._id, "WindowsCoveringControls", req.body.idProject, req.body.areaLocation, req.body.name, "Windows Covering Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API LIGHT CONTROL end  --------- */

/* --------- API TEMPERATURE CONTROL --------- */
router.post("/newTemperatureControl", function(req, res, next){
  console.log("Start to save New Temperature Control");
  var TemperatureControl = new TemperatureControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    wallOrientation: req.body.wallOrientation,
    type: req.body.type ,
    element: req.body.element,
    brand: req.body.brand,
    model: req.body.model,
    observation: req.body.observation
  });

  TemperatureControl.save().then(function(us) {
    addDeviceToProject(us._id, "TemperatureControls", req.body.idProject, req.body.areaLocation, req.body.name, "Temperature Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API TEMPERATURE CONTROL end  --------- */

/* --------- API VIDEO CONTROL --------- */
router.post("/newVideoControl", function(req, res, next){
  console.log("Start to save New Video Control");
  var VideoControl = new VideoControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new VideoControl" + VideoControl);

  VideoControl.save().then(function(us) {
    addDeviceToProject(us._id, "VideoControls", req.body.idProject, req.body.areaLocation, req.body.name, "Video Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});

router.post("/updateVideoControl", function(req, res, next){
  console.log("Start to update Video Control");
  VideoControls.update(
    { '_id': req.body._id },
    { $set: {
      areaLocation: req.body.areaLocation,
      name: req.body.name,
      whoProvide: req.body.whoProvide,
      type: req.body.type ,
      brand: req.body.brand,
      observation: req.body.observation
      }
    },
    function(err, result) {
      if (err) { console.log(err) }
      else {  //console.log("Project status change to " + changeTo + ' y el doc con: ' + result);
              res.send(true); }
    });
});
/* --------- API VIDEO CONTROL end  --------- */

/* --------- API PHONE CONTROL --------- */
router.post("/newPhoneControl", function(req, res, next){
  console.log("Start to save New Phone Control");
  var PhoneControl = new PhoneControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new PhoneControl" + VideoControl);

  PhoneControl.save().then(function(us) {
    addDeviceToProject(us._id, "PhoneControls", req.body.idProject, req.body.areaLocation, req.body.name, "Phone Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API PHONE CONTROL end  --------- */

/* --------- API SURVILLANCE CONTROL --------- */
router.post("/newSurvillanceControl", function(req, res, next){
  console.log("Start to save New Survillance Control");
  var SurvillanceControl = new SurvillanceControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new SurvillanceControl" + VideoControl);

  SurvillanceControl.save().then(function(us) {
    addDeviceToProject(us._id, "SurvillanceControls", req.body.idProject, req.body.areaLocation, req.body.name, "Survillance Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API SURVILLANCE CONTROL end  --------- */

/* --------- API SECURITY CONTROL --------- */
router.post("/newSecurityControl", function(req, res, next){
  console.log("Start to save New Security Control");
  var SecurityControl = new SecurityControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new SecurityControl" + VideoControl);

  SecurityControl.save().then(function(us) {
    addDeviceToProject(us._id, "SecurityControls", req.body.idProject, req.body.areaLocation, req.body.name, "Security Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API SECURITY CONTROL end  --------- */

/* --------- API IRRIGATION CONTROL --------- */
router.post("/newIrrigationControl", function(req, res, next){
  console.log("Start to save New Irrigation Control");
  var IrrigationControl = new IrrigationControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new IrrigationControl" + VideoControl);

  IrrigationControl.save().then(function(us) {
    addDeviceToProject(us._id, "IrrigationControls", req.body.idProject, req.body.areaLocation, req.body.name, "Irrigation Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API IRRIGATION CONTROL end  --------- */

/* --------- API POOL CONTROL --------- */
router.post("/newPoolControl", function(req, res, next){
  console.log("Start to save New Pool Control");
  var PoolControl = new PoolControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new PoolControl" + VideoControl);

  PoolControl.save().then(function(us) {
    addDeviceToProject(us._id, "PoolControls", req.body.idProject, req.body.areaLocation, req.body.name, "Pool Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API POOL CONTROL end  --------- */

/* --------- API APPLIANCE CONTROL --------- */
router.post("/newApplianceControl", function(req, res, next){
  console.log("Start to save New Appliance Control");
  var ApplianceControl = new ApplianceControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new ApplianceControl" + VideoControl);

  ApplianceControl.save().then(function(us) {
    addDeviceToProject(us._id, "ApplianceControls", req.body.idProject, req.body.areaLocation, req.body.name, "Appliance Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API APPLIANCE CONTROL end  --------- */

/* --------- API NETWORL CONTROL --------- */
router.post("/newNetworkControl", function(req, res, next){
  console.log("Start to save New Network Control");
  var NetworkControl = new NetworkControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new NetworkControl" + VideoControl);

  NetworkControl.save().then(function(us) {
    addDeviceToProject(us._id, "NetworkControls", req.body.idProject, req.body.areaLocation, req.body.name, "Network Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API NETWORL CONTROL end  --------- */

/* --------- API CORE CONTROL --------- */
router.post("/newCoreControl", function(req, res, next){
  console.log("Start to save New Core Control");
  var CoreControl = new CoreControls({
    idProject: req.body.idProject,
    areaLocation: req.body.areaLocation,
    name: req.body.name,
    whoProvide: req.body.whoProvide,
    type: req.body.type ,
    brand: req.body.brand,
    observation: req.body.observation
  });
  console.log("Show new CoreControl" + VideoControl);

  CoreControl.save().then(function(us) {
    addDeviceToProject(us._id, "CoreControls", req.body.idProject, req.body.areaLocation, req.body.name, "Core Control", us.observation);
    console.log("Device saved...");
    res.send(true);
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data");
  })
});
/* --------- API CORE CONTROL end  --------- */



/* --------- API DEACTIVATE PROJECT  --------- */
router.get("/deactivateprojectTrue/", function(req, res){

  var id = new ObjectId(req.query.idPrj);

  //var changeTo = req.query.status;
  //console.log('id to edit: ' + id + ' incoming status ' + changeTo);
  Project.update(
    { '_id': id },
    { $set: { 'avaliable' : false }},
    function(err, result) {
      if (err) { console.log(err) }
      else {  //console.log("Project status change to " + changeTo + ' y el doc con: ' + result);
              res.send(true); }
    });
});

router.get("/deactivateprojectFalse/", function(req, res){

  var id = new ObjectId(req.query.idPrj);

  //var changeTo = req.query.status;
  //console.log('id to edit: ' + id + ' incoming status ' + changeTo);
  Project.update(
    { '_id': id },
    { $set: { 'avaliable' : true }},
    function(err, result) {
      if (err) { console.log(err) }
      else {  //console.log("Project status change to " + changeTo + ' y el doc con: ' + result);
              res.send(true); }
    });

});
/* --------- API DEACTIVATE PROJECT end  --------- */



/* ------------ RENDER APP ------------ */
router.get("/", function(req, res) {
	res.render("app/dashboard");
});
/* ------------ RENDER APP end ------------ */




/* ------------ FIND ALL PROJECTS DASHBOARD ------------ */
router.get("/projectList", function(req, res){
	console.log("listing projects from projectList");
	var project = Project.find({ idRespons: { $in: [req.session.user_id] }}, function(err, docs){
		// console.log('Project List: ' + docs);
    res.send(docs);
	});
});
/* ------------ FIND ALL PROJECTS DASHBOARD end ------------ */




/* ------------ PROJECT ------------ */
router.get("/newProject", function(req, res) {
  res.render("app/newProject");
});

router.post("/createNewProject", function(req, res) {
  console.log("Generating new project and save it");

  var project = new Project({
                nameProject:req.body.nameProject,
                respons:req.body.inCharge,
                idRespons:req.session.user_id,
                address:req.body.address,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                contactPerson: req.body.contact,
                phoneContactPerson: req.body.phone,
                firstcontact: req.body.firstvisit,
                observation: req.body.observation,
                qntDevices: 0,
                activeStatus: "Starting",
                avaliable: 1,
                areas: []
  });
  /* Promises */
  project.save().then(function(pro){
    res.redirect("/dashboard");
  },function(err){
    console.log(String(err));
    res.send("There was a problem while save the data of project");
  });
});

router.delete("/project/:id", function (req, res) {
  // aca hay que hacer la consulta para eliminar todos los devices y areas asociadas al proyecto o simplemente esconderlo.
  Project.remove({_id: req.params.id}, function (err, doc){
    res.json(doc);
  })
});
/*------------- PROJECT end ------------ */




/* ------------ RENDER USER PANEL ------------ */
router.get("/adminUsers", function(req, res) {
  res.render('app/adminUsers');
});
/* ------------ RENDER USER PANEL end ------------ */
/* ------------ FIND ALL USERS DASHBOARD ------------ */
router.get("/userList", function(req, res){
	console.log("listing users from UserList");
	var user = User.find({}, function(err, docs){
		user = docs;
		/* console.log("Show data " + user); */
		res.send(user);
	});
});
/* ------------ FIND ALL USERS DASHBOARD end ------------ */

/* ------------ SAVE NEW USER ------------ */
router.post("/users", function(req, res){
	console.log("Accessing user data...");
	var user = new User({username: req.body.username, type: req.body.type, password: req.body.password});

	/* Regular save function */ /*
	user.save(function(err){
		if(err){
			console.log(String(err));
		}
		console.log("Guardamos tus datos!!!!");
	});
	*/

	/* Promises */
	user.save().then(function(us) {
		res.redirect("adminUsers");
		/* res.send("User saved succesfully"); */
	},function(err){
		console.log(String(err));
		res.send("There was a problem while save the data");
	})
});
/* ------------ SAVE NEW USER end ------------ */
/* ------------ EDIT USER ------------ */
router.get("/users/:id", function(req, res){
	console.log("Accessing EDIT user data...");
	User.findOne({_id: req.params.id }, function(err, docs){
		res.send(docs);
	});
});
/* ------------ EDIT USER end ------------ */
/* ------------ UPDATE  USER ------------ */
router.put("/users/:id", function(req, res){
	console.log("UPDATE user data from NODEJS... id: " + req.body.id);
	console.log("Name of user: " + req.body.username);
	console.log("Type of user: " + req.body.type);
	User.update({ _id: req.body.id }, { $set: { username: req.body.username,
                                              type: req.body.type,
                                              password: req.body.password
                                            } },  function(err, docs) {
                                                    if (err) { console.log(err) }
                                                    else { console.log("Data updated" + res.json(docs)); }
                                                  });
});
/*------------- UPDATE USER end ------------ */
/*------------- DELETE USER ------------ */
router.delete("/users/:id", function (req, res) {
  User.remove({_id: req.params.id}, function (err, doc){
    res.json(doc);
  })
});
/*------------- DELETE USER end ------------ */


/* ------------ RENDER ABOUT PAGE ------------ */
router.get("/about", function(req, res){
		res.render('app/about');
});
/* ------------ RENDER ABOUT PAGE end ------------ */


/* ------------ FINISH SESSION - LOGOUT ------------ */
router.get("/closeSession", function(req, res){
	req.session = null;
	res.redirect("/");
});
/* ------------ FINISH SESSION - LOGOUT end ------------ */


/* ------------ LOAD PROJECT TO WORK ------------ */
router.get("/activeProject/:id", function(req, res) {
  // console.log("Load activeProject template for id: " + req.params.id);
  // var pSelected = Project.findOne({_id: req.params.id }, function(err, docs){
  //   if(err){
  //     res.send("Error in query Projects");
  //   }else{
  //     console.log(docs);
  //     res.render("app/activeProject", {dataProject: docs});
  //   }
  // });
  res.render("app/activeProject");
});
/* ------------ LOAD PROJECT TO WORK end ------------ */


/* ------------ LOAD PROJECT WORKING ------------ */
router.get("/findActiveProject", function(req, res){
  var pSelected = Project.findOne({_id: req.query.id }, function(err, docs){
    if(err){
      res.send("Error in query Projects");
    }else{
      res.send(docs);
    }
  });
});
/* ------------ LOAD PROJECT WORKING end ------------ */


/* ------------ AREAS ------------ */
router.get("/findProjectAreas", function(req, res){
  console.log("Listing Areas from project");
  var areas = Area.find({projectAsociate: req.query.id}, function(err, docs){
    if(err){
      console.log(err);
    }else{
      console.log("Areas : " + docs + " //////// ")
      res.send(docs);
    }

  });
});

router.post("/newArea", function(req, res) {
  // console.log("Add new area" + req.body.name + ' - ' + req.body.proj);

  var area = new Area({name: req.body.name, projectAsociate: req.body.proj});

	/* Promises */
	area.save().then(function(area) {
    console.log('New area saved...');
    res.send(true);
    //res.render("app/activeProject");
	},function(err){
		console.log(String(err));
		res.send("There was a problem while save the data");
	})
});
/* ------------ AREAS end ------------ */


/* ------------ FIND DEVICES ------------ */
router.get("/findProjectDevices", function(req, res){
  console.log("listing areas front project");
  var devices = LightsControls.find({}, function(err, docs){
    if(err){
      console.log(err);
    }else{
      // console.log(docs + " //////// ")
      res.send(docs);
    }

  });
});
/* ------------ FIND DEVICES end ------------ */


/* ------------ FIND ONE DEVICE AND SHOW IN MODALS------------ */
router.get("/findOneDevice", function(req, res){
  console.log("looking for a device...");
  console.log("coleccion a editar: "+ req.query.DevicCollection);
  var Pointer = req.query.DevicCollection;

  function evalDevice(err, doc){
    if(err){
      console.log(err);
    }else{
      res.send(doc);
    }
  }

  switch (Pointer) {
  case "OutletBoxs":
    var device = OutletBoxs.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "LightsControls":
    var device = LightsControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "WindowsCoveringControls":
    var device = WindowsCoveringControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "TemperatureControls":
    var device = TemperatureControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "AudioControls":
    var device = AudioControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "VideoControls":
    var device = VideoControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "PhoneControls":
    var device = PhoneControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "SurvillanceControls":
    var device = SurvillanceControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "SecurityControls":
    var device = SecurityControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "IrrigationControls":
    var device = IrrigationControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "PoolControls":
    var device = PoolControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "ApplianceControls":
    var device = ApplianceControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
  case "NetworkControls":
    var device = NetworkControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  case "CoreControls":
    var device = CoreControls.findOne({_id:req.query.idDevic}, function(err, doc){
      evalDevice(err, doc);
    });
    break;
  default:
    console.log("Sorry, value not find");
    break;
}

});
/* ------------ FIND ONE DEVICE AND SHOW IN MODALS end ------------ */



module.exports = router;
