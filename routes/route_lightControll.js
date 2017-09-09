




/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//////////////////// DELETE THIS CODE ///////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

var LightsControls = require('../models/lightsControls').LightsControls;

//GET - Return all Light Controlls in the DB
exports.findAllLightControll = function(req, res) {
    LightsControls.find(function(err, LightsControls) {
    if(err) res.send(500, err.message);

    console.log('GET /LightsControls')
        res.status(200).jsonp(LightsControls);
    });
};


//GET - Return a Light Controlls with specified ID
exports.findById = function(req, res) {
    LightsControls.findById(req.params.id, function(err, LightsControls) {
    if(err) return res.send(500, err.message);

    console.log('GET /LightsControls/' + req.params.id);
        res.status(200).jsonp(LightsControls);
    });
};


//POST - Insert a new Light Controll in the DB
exports.addLightControll = function(req, res) {
    console.log('POST');
    console.log(req.body);
    console.log("nice to be here");

    var LightControll = new LightsControls({

    	areaLocation: req.body.areaLocation,
      name: req.body.name,
      type: req.body.type,
      clase: req.body.clase,
      wallOrientation: req.body.wallOrientation,
      whoProvide: req.body.whoProvide,
      qtyBulbs: req.body.qtyBulbs,
      loadEachBulb: req.body.loadEachBulb,
      circuitLoad: req.body.circuitLoad,
      observation: req.body.observation
    });

    LightControll.save(function(err, LightControll) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(LightControll);
    });
};
