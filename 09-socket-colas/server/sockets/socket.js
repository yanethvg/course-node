const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
    console.log("Usuario conectado");
    // Para ver el ticket siguiente por medio del boton
    client.on("siguienteTicket", (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit("estadoActual", {
        actual: ticketControl.getEstadoTicket(),
        ultimos4: ticketControl.getUltimos4(),
    });

    client.on("atenderTicket", (data, callback) => {
        //console.log(data.escritorio);

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es necesario",
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        //actualizar / notificar cambiosm en los ultimos 4
        // evento que debe de dispararse dentro de atender ticket
        client.broadcast.emit("ultimos4", {
            ultimos4: ticketControl.getUltimos4(),
        });
    });
});