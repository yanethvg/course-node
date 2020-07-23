//const argv = require("yargs").argv;
//console.log(argv);
const colors = require("colors");
const { argv } = require("./config/yargs");
const {
    crear,
    getListado,
    actualizar,
    borrar,
} = require("./por-hacer/por-hacer");
//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case "crear":
        let tarea = crear(argv.descripcion);
        console.log(`tarea: ${tarea.descripcion} creada correctamente`.rainbow);
        //console.log("Crear por hacer");
        break;
    case "listar":
        let listado = getListado();
        for (let tarea of listado) {
            console.log("==========Por Hacer=======".green);
            console.log(tarea.descripcion);
            console.log("Estado: ", tarea.completado);
            console.log("=========================".green);
        }
        // console.log("Mostrar todas las tareas por hacer");
        break;
    case "actualizar":
        let actualizado = actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        //console.log("Actualiza una tarea por hacer");
        break;

    case "borrar":
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log("Comando no es reconocido");
        break;
}