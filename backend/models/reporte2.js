import mongoose from "mongoose"

const ReporteSchema = new mongoose.Schema({

categoria:String,

urgencia:String,

imagen:String,

fecha:{
type:Date,
default:Date.now
}

})

export default mongoose.model("Reporte",ReporteSchema)