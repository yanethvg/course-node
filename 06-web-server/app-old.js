const http = require("http");

//creacion de server que viene en node
http
    .createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });

        let salida = {
            nombre: "Zoila",
            edad: 24,
            url: req.url,
        };
        res.write(JSON.stringify(salida));
        //res.write("Hola Mundo");
        //cerrando la comunicacion del servidor
        res.end();
    })
    .listen(8080);

console.log("Escuchando el puerto 8080");