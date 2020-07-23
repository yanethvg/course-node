/*const opts = {
    descripcion: {
        demand: true,
        alias: "d",
    },
};

const opts_upd = {
    descripcion: {
        demand: true,
        alias: "d",
        desc: "Descripción de la tarea por hacer",
    },
    completado: {
        demand: true,
        alias: "c",
        default: true,
        desc: "Marca como completado o pendiente la tarea",
    },
};*/

const descripcion = {
    demand: true,
    alias: "d",
};
const completado = {
    demand: true,
    alias: "c",
    default: true,
    desc: "Marca como completado o pendiente la tarea",
};

const argv = require("yargs")
    .command("crear", "Crear un elemento por hacer", { descripcion })
    .command("actualizar", "Actualizar el estado completado de una tarea", {
        descripcion,
        completado,
    })
    .command("borrar", "Borrar un elemento por hacer", { descripcion })
    .help().argv;

module.exports = {
    argv,
};