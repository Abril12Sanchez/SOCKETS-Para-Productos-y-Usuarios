const socket = io();
var mensajeDiv= document.getElementById("mensaje");
var datos=document.getElementById("datos");

//MOSTRAR DATOS DE MONGO DB
socket.on("servidorEnviarProductos",(productos)=>{
    console.log(productos);
    // console.log(usuarios);
    var tr="";
    productos.forEach((producto, idLocal) => {
        tr=tr+`
        <tr>
        <td>${(idLocal+1)*100}</td>
        <td>${producto.producto}</td>
        <td>${producto.precio}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.cantidad}</td>
        <td>
            <a href="#" onClick="editarProducto('${producto._id}')"> Editar<a/>
            <a href="#" onClick="borrarProducto('${producto._id}')"> Borrar<a/>
        </td>
        </tr>
        `;
    });
    datos.innerHTML=tr;

});//escuchando cunaod el ser mande datos

// GUARDAR DATOS A MONGO DB

var enviarDatos = document.getElementById("enviarDatos");

enviarDatos.addEventListener("submit", (e)=>{
    console.log("entro a enviar datos");
    e.preventDefault();
    //recivir datos
    var producto={
        producto:document.getElementById("producto").value,
        precio:document.getElementById("precio").value,
        descripcion:document.getElementById("descripcion").value,
        cantidad:document.getElementById("cantidad").value,
        
    }
    // console.log(producto+" si recivio producto?");
    console.log(JSON.stringify(producto) + " ¿se recibió el producto?");

    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado",(mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML=mensaje;
        setTimeout(()=>{
            mensajeDiv.innerHTML="";
        },3000);

         //REINICIAR EL FORMULARIO
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("producto").focus()
    });

    console.log("Reciviendo datooos del producto...");

});


//MODIFICAR UN REGISTRO

function editarProducto(id){
    console.log(id);
    // window.location.href = 'editarProducto.html?id=' + id;
    
}

//ELIMINAR REGISTRO
function borrarProducto(id){
    console.log(id);

    // socket.emit("clienteBorrarProducto", id);
    // socket.on("servidorProductoBorrado", (mensaje) => {
    //   mensajeHtmlDel.innerHTML = mensaje;
    //   setTimeout(() => {
    //     mensajeHtml.innerHTML = "";
    //     location.reload();
    //   }, 1000);
    // });

}
