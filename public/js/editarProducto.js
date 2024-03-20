const socket = io();

var enviarDatos = document.getElementById("enviarDatos");
var mensajeHtml = document.getElementById("mensaje");

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        // Emitir un evento al servidor para obtener los datos del producto por su ID
        socket.emit("clienteEditarProducto", productId);
    }

    // Escuchar la respuesta del servidor con los datos del producto y llenar los campos del formulario
    socket.on("servidorProductoEditado", (producto) => {
        document.getElementById("id").value = producto._id;
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("marca").value = producto.marca;
        document.getElementById("cantidad").value = producto.cantidad;
    });
});

// Editar producto
enviarData.addEventListener("submit", (e) => {
    e.preventDefault();
    // Recibir datos
    var producto = {
        _id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        marca: document.getElementById("marca").value,
        cantidad: document.getElementById("cantidad").value,
    };

    socket.emit("clienteEditarProducto", producto);
    socket.on("servidorProductoEditado", (producto) => {
        mensajeHtml.innerHTML = "Producto Editado";
        setTimeout(() => {
            mensajeHtml.innerHTML = "";
            location.href = "productos.html";
        }, 2000);
    });
});