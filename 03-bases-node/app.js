const { argv } = require("./config/yargs");
const colors = require("colors");
const { crearArchivo, mostrarTabla } = require("./multiplicar/multiplicar");

let comando = argv._[0];

switch (comando) {
    case "listar":
        console.log("Listar");
        mostrarTabla(argv.base, argv.limite)
            .then((tabla) => console.log(tabla))
            .catch((err) => console.log(err));
        break;
    case "crear":
        console.log("crear");
        crearArchivo(argv.base, argv.limite)
            .then((archivo) => console.log(`Archivo creado: ${archivo}`.rainbow))
            .catch((err) => console.log(err));
        break;
    default:
        console.log("Comando no reconocido");
}

//console.log(module);
//objeto global que esta disponible siempre

/*

let base = 3;
let data = "";

for (let i = 1; i <= 10; i++) {
    //console.log(`${base} * ${i} = ${base * i}`);
    data += `${base} * ${i} = ${base * i} \n`;
}

fs.writeFile(`tablas/tabla${base}.txt`, data, (err) => {
    if (err) throw err;
    console.log(`El archivo tabla-${base}.txt ha sido creado`);
});*/

//cuando node se ejecuta crea esta variable no se instancia process
// argumentos argv
//console.log(process.argv);

//split para separar un string en un arreglo a partir de un parametro
//let base = parametro ? parametro.split("=")[1] : 1;

//console.log(argv.limite);

//let argv2 = process.argv;
//let parametro = argv[2];
//let base = parametro.split("=")[1];