const {mongoose}=require("../database/conexion.js");

const productoSchema=new mongoose.Schema({
    producto:{
        type:String,
        require:true
    },
    precio:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    cantidad:{
        type: String,
        default:true
    }
});

module.exports=mongoose.model("producto", productoSchema);
