const { getInfo } = require("./services/getData");

const argv = require("yargs").options({
    direccion: {
        alias: "d",
        desc: "Dirección de la ciudad para obtener el clima",
        demand: true,
    },
}).argv;

//console.log(argv);
getInfo(argv.direccion)
    .then(console.log)
    .catch((err) => console.log(err));