const express = require("express");
const app = express();
const hbs = require("hbs");
require("./hbs/helpers");

// uso de midleware para mostrar lo que es publico esto de dominio publico
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;

//Express HBS
// Express HBS engine
hbs.registerPartials(__dirname + "/views/parciales");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    //res.send("Hola Mundo");
    /*
                                let salida = {
                                    nombre: "Zoila",
                                    edad: 24,
                                    url: req.url,
                                };
                                res.send(salida);*/
    //para renderizar automaticamente busca el archivo hbs
    res.render("home", {
        nombre: "zoila",
    });
});

app.get("/about", (req, res) => {
    //res.send("Hola Mundo");
    /*
                                let salida = {
                                    nombre: "Zoila",
                                    edad: 24,
                                    url: req.url,
                                };
                                res.send(salida);*/
    //para renderizar automaticamente busca el archivo hbs
    res.render("about", {
        nombre: "Zoila",
    });
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});