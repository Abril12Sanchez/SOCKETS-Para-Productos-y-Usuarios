const Producto=require("../models/producto") //representa objeto

function socket(io) {
    io.on("connection", (socket)=>{
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



