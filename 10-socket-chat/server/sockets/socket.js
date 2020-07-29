const { io } = require("../server");
const { Usuarios } = require("../classes/usuarios");
const { crearMensaje } = require("../utilidades/utilidades");

const usuarios = new Usuarios();

io.on("connection", (client) => {
    client.on("entrarChat", (data, callback) => {
        //console.log(data);

        if (!data.nombre || !data.sala) {
            return callback({
                err: true,
                mensaje: "El nombre y la sala son necesario",
            });
        }
        // para poner a los usuarios de acuerdo a su sala
        client.join(data.sala);
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        // se egrage el to para enviar los mensajes a una sala en particular
        // usuarios.getPersonas()
        client.broadcast
            .to(data.sala)
            .emit("listaPersona", usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));
    });
    // escuchando cuando un usuario envie un mensaje
    client.on("crearMensaje", (data) => {
        // buscando a la persona
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
    });

    client.on("disconnect", () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast
            .to(personaBorrada.sala)
            .emit(
                "crearMensaje",
                crearMensaje(
                    "Administrador",
                    `${personaBorrada.nombre} abandono el chat`
                )
            );
        client.broadcast
            .to(personaBorrada.sala)
            //usuarios.getPersonas()
            .emit("listaPersona", usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    // mensajes privados
    client.on("mensajePrivado", (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast
            .to(data.para)
            .emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
    });
});