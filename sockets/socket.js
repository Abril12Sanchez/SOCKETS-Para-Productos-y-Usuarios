// const { log } = require("console");
// io recive mensaje
const Usuario=require("../models/usuario") //representa objeto
const Producto=require("../models/producto") //representa objeto

function socket(io) {
    io.on("connection", (socket)=>{
        //io.emit
        // mostrar registros
        // MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios(){
            const usuarios=await Usuario.find();// funcion de mongus que encuentra
            // console.log(usuarios);
            io.emit("servidorEnviarUsuarios", usuarios)
        }

        // GUARDAR USUARIO

        socket.on("clienteGuardarUsuario", async(usuario)=>{
            // await new Usuario(usuario).save();
            console.log("Guardar usuario");
            console.log(usuario);
            try{
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado", "usuario Guardado")
                console.log("Usuario Guardado"); 
            }catch(e){
                console.log("Error al registra usuario"+e);
            }
        });

        mostrarProductos();
        async function mostrarProductos(){
            const productos=await Producto.find();// funcion de mongus que encuentra
            io.emit("servidorEnviarProductos", productos)
        }

        // GUARDAR USUARIO

        socket.on("clienteGuardarProducto", async(producto)=>{
            // await new Usuario(usuario).save();
            console.log("Guardar producto");
            console.log(producto);
            try{
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "producto Guardado")
                console.log("Pro Guardado"); 
               
                
            }catch(e){
                console.log("Error al registra el producto"+e);
            }
        });

    });// FIN IO.ON
}


module.exports = socket;



