var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var outletBox_Schema = new Schema ({
    idProject: {type: String }, 
    areaLocation: {type: String },
    name: {type: String },
    existing: {type: String },
    gangQty: {type: String},
    wallOrientation: {type: String },
    xPos: {type: String},
    yPos: {type: String},
    observation: {type: String }
});

var OutletBoxs = mongoose.model("outletBox", outletBox_Schema);

module.exports.OutletBoxs = OutletBoxs;

/*
        internalIdArea: number, // auntoInc,
        internalIdProyect: number, // autoInc,
        internalOuletBox: number, // autoInc,
        existing: boolean // opciones: true, false - con esto saber si existe el gang o hay que hacerlo y por defecto es YES.
        gangQty: number, //  opciones: 1, 2, 3 ,4, 5, 6, 7, 8, 9, 10
        wallOrientation: string // opciones: Nort, South, East, West 
        xPos: string // opciones: left, center, right], 
        yPos: string // opciontes: border, up, center ,down, buttom
        eachGang:   [ 
                            {avaliableGang: string, eachGangModel:string, eachGangType:string, [ {available:string, {object_device_id}, 
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id} 
                                                                                               ]
                            },
                            {avaliableGang: string, eachGangModel:string, eachGangType:string, [ {available:string, {object_device_id}, 
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id} 
                                                                                               ]
                            },
                            {avaliableGang: string, eachGangModel:string, eachGangType:string, [ {available:string, {object_device_id}, 
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id} 
                                                                                               ]
                            },
                            {avaliableGang: string, eachGangModel:string, eachGangType:string, [ {available:string, {object_device_id}, 
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id},
                                                                                                 {available:string, {object_device_id} 
                                                                                               ]
                            },
                        ], // availableGang = disponible el gang, available = disponible el espacio
                        // arreglo segun gangQty, luego definir cada eachGangType segun "selfGang, combinedx2, combinedx3, combinedx4" 
                        // luego cada objeto seleccionar type = opciones: "lightswitch, socket, net, hdmi, ir, coaxial, usb, sound, service"
        faceplate: number, // [1,2,3,4]  teoricamente debe ser el mismo valor que gangQty
        gangUsed: number, // calculado de la carga de posibles switch o type de cada uno.
        gangFree: number // calculo de (gangQty - gangUsed)
        gangCombinedAvaliable: boolean // evaluar los objetos y verificar si hay avaliable = true
        observation: string
        */