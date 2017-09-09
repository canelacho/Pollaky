var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var temperatureControls_Schema = new Schema ({
    idProject: {type: String },
    areaLocation: {type: String },
    name: {type: String },
    whoProvide: {type: String },
    wallOrientation: {type: String },
    type: {type: String},
    element: {type: String},
    brand: {type: String},
    model: {type: String },
    observation: {type: String }
});

var TemperatureControls = mongoose.model("temperatureControl", temperatureControls_Schema);

module.exports.TemperatureControls = TemperatureControls;



// tempControlUnit {   internalIdProyect: number // vine del numero del proyecto
//                     areaLocation: number // viene del area al que pertenecera
//                     internalIdDevice: number // union internalIdProyect + areaLocation + numInc
//                     name: string // nombre propio identificador del dispositivo
//                     wallOrientation: string // opciones: Nort, South, East, West
//                     whoProvide: string // opciones: ctrlable, client
//                     type: string // cooling, heating, cooling and heating
//                     element: string // air or water
//                     brand: string // marca
//                     model: string // modelo aparato
//                 },
// thermostat {    internalIdProyect: number // vine del numero del proyecto
//                 areaLocation: number // viene del area al que pertenecera
//                 internalIdDevice: number // union internalIdProyect + areaLocation + numInc
//                 name: string // nombre propio identificador del dispositivo
//                 wallOrientation: string // opciones: Nort, South, East, West
//                 whoProvide: string // opciones: ctrlable, client
//                 controllingAreas: [] // areas que pueda controlar
//                 type: string // zWaveIrBridg, zWave, ip_CloudBased
//                 humiditySens: {yes, no},
//                 tempSens: {yes, no},
//                 noConectivitie: boolean // yes or no (no tiene manera de controlar)
//                 observation: value
//                 dependencies: {other devices}
//             },
