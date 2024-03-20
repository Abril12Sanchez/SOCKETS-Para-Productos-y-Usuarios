const {mongoose}=require("../database/conexion.js");

const usuarioSchema=new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    usuario:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type: Boolean,
        default:true
    }
});

module.exports=mongoose.model("usuario", usuarioSchema);
