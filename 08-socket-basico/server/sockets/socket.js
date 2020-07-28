const { io } = require("../server");

//para saber si esta conectado
io.on("connection", (client) => {
    console.log("Usuario conectado");

    client.emit("enviarMensaje", {
        usuario: "Administrador",
        mensaje: "Bienvenido a esta aplicacion",
    });

    client.on("disconnect", () => {
        console.log("Usuario desconectado");
    });

    // Escuchar al cliente
    client.on("enviarMensaje", (data, callback) => {
        console.log(data);
        // para que se emita en todos los canales clientes
        client.broadcast.emit("enviarMensaje", data);
        /*
                                if (mensaje.usuario) {
                                    // para disparar la funcion que esta en el front
                                    callback({
                                        resp: "TODO SALIO BIEN",
                                    });
                                } else {
                                    callback({
                                        resp: "TODO SALIO MAL !!!!",
                                    });
                                }
                            */
    });
});