const socket = io();
var mensajeDiv= document.getElementById("mensaje");
var datos=document.getElementById("datos");

//MOSTRAR DATOS DE MONGO DB
socket.on("servidorEnviarUsuarios",(usuarios)=>{
    // console.log(usuarios);
    var tr="";
    usuarios.forEach((usuario, idLocal) => {
        tr=tr+`
        <tr>
        <td>${(idLocal+1)*100}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.usuario}</td>
        <td>${usuario.password}</td>
        <td>
            <a href="#" onClick="editarUsuario('${usuario._id}')"> Editar<a/>
           / <a href="#" onClick="borrarUsuario('${usuario._id}')"> Borrar<a/>
        </td>
        </tr>
        `;
    });
    datos.innerHTML=tr;

});//escuchando cunaod el ser mande datos

// GUARDAR DATOS A MONGO DB




var enviarDatos = document.getElementById("enviarDatos");

enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    //recivir datos
    var usuario={
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value,
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado",(mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML=mensaje;
        setTimeout(()=>{
            mensajeDiv.innerHTML="";
            location.reload();
        },3000);

         //REINICIAR EL FORMULARIO
    document.getElementById("nombre").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("nombre").focus()
    });

    console.log("Reciviendo datooos...");
    //RECIBIR DATOS DEL FORMULARIO
    // console.log("Formulario enviado");
    // var nombre = document.getElementById("nombre").value;
    // var datos = document.getElementById("datos");
    // var usuario = document.getElementById("usuario").value;
    // var password = document.getElementById("password").value;
    // console.log(nombre);
    // console.log(usuario);
    // console.log(password);

    
    

    // console.log("Nombre: " + nombre);
    // console.log("Usuario: " + usuario);
    // console.log("Password: " + password);


   
});


//MODIFICAR UN REGISTRO

function editarUsuario(id){
    // console.log(id);
    socket.emit("clienteObtenerUsuarioPorID", id) 
}

socket.on("servidorObtenerUsuarioPorID",(usuario)=>{
    console.log(usuario);
    document.getElementById("id").value=usuario._id;
    document.getElementById("nombre").value=usuario.nombre;
    document.getElementById("usuario").value=usuario.usuario;
    document.getElementById("password").value=usuario.password;
    document.getElementById("txtNuevoUsuario").innerHTML="Editar Usuario";
    document.getElementById("txtGuardarUsuario").innerHTML="Guardar Cambios";

});


//cliente


//ELIMINAR REGISTRO
function borrarUsuario(id){
    console.log(id);
    socket.emit("clienteBorrarUsuario",id);
    // alert("El usuario con el id " + id + " ha sido borrado.");
}


socket.on("confirmarBorradoUsu", (id) => {
    var confirmar = confirm("¿Seguro que quieres borrar este usuario?");
    if (confirmar) {
        // Si el usuario confirmó, emitir un evento al servidor para proceder con el borrado
        socket.emit("confirmarBorradoUsu", id);
    }
});