require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const bodyParser = require("body-parser");

//configuracion para el body parser
// middleware aplicado para capturar lo del formulario
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));
//console.log(path.resolve(__dirname, "../public"));

//configuracion global de rutas
app.use(require("./routes/index"));

//con esto usamos las rutas dentro de usuario
/*
Antes de hacer el index dentro de routes
app.use(require("./routes/usuario"));
app.use(require("./routes/login"));
*/
/*
app.get("/", function(req, res) {
    // send es para enviar html
    // json es para enviar json
    res.json("Hello World");
});*/

mongoose
    .connect("mongodb://localhost:27017/cafe", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((result) => console.log("Conectado a MongoDB"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});