var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var windowsCoveringControl_Schema = new Schema ({
    idProyect: {type: String }, 
    areaLocation: {type: String },
    name: {type: String },
    whoProvide: {type: String },
    wallOrientation: {type: String },  
    minwindowsWidth: {type: Number},
    windowsHeight: {type: Number},
    windowsDepth: {type: Number},
    motorPosition: {type: String }, 
    ankled: {type: String },
    depthPosition: {type: String },
    fabric: {type: String },
    observation: {type: String }
});

var WindowsCoveringControls = mongoose.model("windowsCoveringControl", windowsCoveringControl_Schema);

module.exports.WindowsCoveringControls = WindowsCoveringControls;

/*


windowCovering, {   internalIdProyect: number // vine del numero del proyecto
                    areaLocation: number // viene del area al que pertenecera
                    internalIdDevice: number // union internalIdProyect + areaLocation + numInc
                    name: string // nombre propio identificador del dispositivo
                    wallOrientation: string // opciones: Nort, South, East, West 
                    whoProvide: string // opciones: ctrlable, client
                    minwindowsWidth: number // minimo ancho,
                    windowsHeight: number // alto
                    windowsDepth: number // si tiene profundida la ventana
                    motorPosition: string // left, right
                    fabric: string // options code from book,
                    depthPosition: string // inside, outside (si se enmarca dentro de la ventana o sobre la ventana)
                    ankled: string // ceiling, vall
                    windowsType: [{
                                    model: string // roller
                                    rollDirection: string // {'roll to the windows', 'reverse away from the windows'},
                                    fascia: boolean // {yes, no} es la tapa de los motores, pantalla
                                    fasciaColor: {white, bronze, ivory, black, silver},
                                    hembar: string // son las guias para que no se batan las telas {pocket, round fabric 1 side, ound fabric 2 sides}, 
                                  },
                                  {
                                    model: string // draperytrack
                                    open: string // left, right, center 
                                    trackSplit: boolean // yer or no
                                    Fold: string // French Pleat (mas cobertura) or Ripple fold (forma la S al desplegar la cortina) 
                                  }]
                    observation: string // observaciones
                    dependencies: {other devices}
                },

                */