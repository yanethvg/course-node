const express = require("express");

const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");

const app = express();

app.get("/usuario", function(req, res) {
    // trae todos los registros de la colleccion
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    // para limitar los campos para busqueda Usuario.find({}, "nombre email")
    Usuario.find({ estado: true }, "nombre email role estado google img")
        //skip es salto y muestra los siguientes
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios,
                });
            });
        });
    //res.json("get Usuario");
});

app.post("/usuario", async function(req, res) {
    let body = req.body;

    const salt = await bcrypt.genSaltSync(10);
    const password = body.password;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(password, salt),
        role: body.role,
    });

    delete body.password;
    delete body.google;

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });
});

app.put("/usuario/:id", function(req, res) {
    let id = req.params.id;
    // arreglo de propiedades validas
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    Usuario.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true, context: "query" },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB,
            });
        }
    );
});

app.delete("/usuario/:id", function(req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false,
    };

    Usuario.findByIdAndUpdate(
        id,
        cambiaEstado, { new: true },
        (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario no encontrado",
                    },
                });
            }
            res.json({
                ok: true,
                usuario: usuarioBorrado,
            });
        }
    );
    // Eliminacion fisica en la base de datos
    /*
            Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                if (!usuarioBorrado) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "Usuario no encontrado",
                        },
                    });
                }
                res.json({
                    ok: true,
                    usuario: usuarioBorrado,
                });
            });*/

    //res.json("delete Usuario");
});

module.exports = app;