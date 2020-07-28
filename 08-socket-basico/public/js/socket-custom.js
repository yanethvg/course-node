var socket = io();
socket.on("connect", function() {
    console.log("Conectado al servidor");
});
// escuchar la información
socket.on("disconnect", function() {
    console.log("Perdimos conexión con el servidor");
});
// Enviar información
socket.emit(
    "enviarMensaje", {
        usuario: "Zoila",
        mensaje: "Hola Mundo",
    },
    function(resp) {
        console.log("Respuesta server: ", resp);
    }
);
// Escuchar informacion
socket.on("enviarMensaje", function(mensaje) {
    console.log("Servidor: ", mensaje);
});