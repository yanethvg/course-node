const express = require("express");

const _ = require("underscore");

const Categoria = require("../models/categoria");

const {
    verificaToken,
    verificaAdminRol,
} = require("../middlewares/authenticacion");

const app = express();

//========================
// Mostrar todas las categorias
//==========================
app.get("/categoria", verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Categoria.find({})
        .sort("descripcion")
        //trae la información de el id que tiene relacion
        .populate("usuario", "nombre email")
        //skip es salto y muestra los siguientes
        //.skip(desde)
        //.limit(limite)
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Categoria.count({}, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                res.json({
                    ok: true,
                    cuantos: conteo,
                    categorias,
                });
            });
        });
});

//========================
// Mostrar una categoria por id
//==========================
app.get("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El ID no es valido",
                },
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});
//========================
// Crear una nueva categoria
//==========================
app.post("/categoria", verificaToken, (req, res) => {
    let body = req.body;
    let usuario = req.usuario;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: usuario._id,
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});
//========================
// Actualizar una categoria, solo actualiza la descripcion
//==========================
app.put("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    // arreglo de propiedades validas
    let body = _.pick(req.body, ["descripcion"]);

    Categoria.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true, context: "query" },
        (err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                categoria: categoriaDB,
            });
        }
    );
});
//========================
// Eliminar una categoria
//==========================
app.delete("/categoria/:id", [verificaToken, verificaAdminRol], (req, res) => {
    // solo un administrador puede borrar
    //Categoria.findByIdAndRemove

    // Eliminacion fisica en la base de datos
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria no encontrada",
                },
            });
        }
        res.json({
            ok: true,
            categoria: categoriaBorrado,
        });
    });
});

module.exports = app;