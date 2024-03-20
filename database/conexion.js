const mongoose=require("mongoose");

require("dotenv").config();
const mongodb_pw=process.env.MONGO_ATLAS; 

// module.exports=
 async function conectarMongo(){
    const mongoDB=mongodb_pw;
    mongoose.set("strictQuery", true);
    try{
        await mongoose.connect(mongoDB,{});
        console.log("Conectado a mongoDB");

    }catch(e){
        console.log("Error en la conexion Mongo"+e);
    }
}
// conectarMongo();
module.exports={
    mongoose,
    conectarMongo

}
