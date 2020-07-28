const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const fs = require("fs");
const path = require("path");

const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

app.use(fileUpload({ useTempFiles: true }));

app.put("/upload/:tipo/:id", function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo",
            },
        });
    }
    //Validar Tipo
    let tiposValidos = ["productos", "usuarios"];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Los tipos permitidos son: " + tiposValidos.join(","),
                tipo,
            },
        });
    }

    // el nombre del input debera ser archivo
    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Las extensiones permitida son: " + extensionesValidas.join(","),
                ext: extension,
            },
        });
    }

    //Cambiando el nombre del archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err,
            });
        //Aqui imagen cargada
        if (tipo === "usuarios") {
            imageUsuario(id, res, nombreArchivo);
        } else {
            imageProducto(id, res, nombreArchivo);
        }
    });
});

function imageUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, "usuarios");
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!usuarioDB) {
            borrarArchivo(nombreArchivo, "usuarios");
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado",
                },
            });
        }

        borrarArchivo(usuarioDB.img, "usuarios");

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo,
                message: "Imagen de usuario subida correctamente",
            });
        });
    });
}

function imageProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, "productos");
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!productoDB) {
            borrarArchivo(nombreArchivo, "productos");
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Producto no encontrado",
                },
            });
        }

        borrarArchivo(productoDB.img, "productos");

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo,
                message: "Imagen de producto subida correctamente",
            });
        });
    });
}

function borrarArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(
        __dirname,
        `../../uploads/${tipo}/${nombreImagen}`
    );
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;