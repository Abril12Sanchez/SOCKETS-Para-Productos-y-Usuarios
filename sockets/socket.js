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
            // console.log("Guardar usuario");
            // console.log(usuario);
            try{
                if(usuario.id==""){
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario Guardado")
                    console.log("Usuario Guardado"); 
                }else{
                    await Usuario.findByIdAndUpdate(usuario.id,usuario);
                    io.emit("servidorUsuarioGuardado","Usuario Modificado")
                } mostrarUsuarios();  

            }catch(e){
                console.log("Error al registra usuario"+e);
            }
        });

        mostrarProductos();
        async function mostrarProductos(){
            const productos=await Producto.find();// funcion de mongus que encuentra
            io.emit("servidorEnviarProductos", productos)
        }

        // GUARDAR PRODUCTO

        socket.on("clienteGuardarProducto", async(producto)=>{
            // await new Usuario(usuario).save();
            console.log("Guardar producto");
            console.log(producto);
            try{
                if(producto.id==""){
                    await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "Producto Guardado") //modificar
                console.log("Pro Guardado"); 
                }else{
                    await Producto.findByIdAndUpdate(producto.id,producto);
                    io.emit("servidorProductoGuardado", "Producto Modificado")
                }mostrarProductos();  
            }catch(e){
                console.log("Error al registra el producto"+e);
            }
        });

        // OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioPorID",async(id)=>{
            const usuario = await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID",usuario);

        });

        // OBTENER PRODUCTOS POR ID
        socket.on("clienteObtenerProductoPorID",async(id)=>{
            const producto = await Producto.findById(id);
            io.emit("servidorObtenerProductoPorID",producto);

        });

        //BORRAR USUARIO POR ID
        // socket.on("clienteBorrarUsuario", async(id)=>{
        //         await Usuario.findByIdAndDelete(id);
        //         io.emit("servidorUsuarioGuardado", "Usuario borrado");
        //         mostrarUsuarios();
        // });

        socket.on("clienteBorrarUsuario", (id) => {
            // Emitir un evento al cliente pidiendo confirmación
            socket.emit("confirmarBorradoUsu", id);
        });
        
        socket.on("confirmarBorradoUsu", async (id) => {
            // Si el cliente confirmó, proceder con el borrado
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado", "Usuario borrado");
            mostrarUsuarios();
        });

         //BORRAR PRODUCTO POR ID
        //  socket.on("clienteBorrarProducto", async(id)=>{
        //     await Producto.findByIdAndDelete(id);
        //     io.emit("servidorProductoGuardado", "producto borrado");
        //     mostrarProductos();
        // });

        socket.on("clienteBorrarProducto", (id) => {
            // Emitir un evento al cliente pidiendo confirmación
            socket.emit("confirmarBorrado", id);
        });
        
        socket.on("confirmacionBorrado", async (id) => {
            // Si el cliente confirmó, proceder con el borrado
            await Producto.findByIdAndDelete(id);
            io.emit("servidorProductoGuardado", "producto borrado");
            mostrarProductos();
        });
        

    });// FIN IO.ON
}


module.exports = socket;



