const express = require("express");

const _ = require("underscore");

const { verificaToken } = require("../middlewares/authenticacion");
const { verificaCategoria } = require("../middlewares/categoria");

let Producto = require("../models/producto");

const app = express();

//========================
// Mostrar todas los productos
//==========================
app.get("/producto", verificaToken, (req, res) => {
    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Producto.find({ disponible: true })
        //trae la información de el id que tiene relacion
        .populate("usuario", "nombre email")
        .populate("categoria", "descripcion")
        //skip es salto y muestra los siguientes
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Producto.count({ disponible: true }, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                res.json({
                    ok: true,
                    cuantos: conteo,
                    productos,
                });
            });
        });
});

//========================
// Producto por id
//==========================
app.get("/producto/:id", verificaToken, (req, res) => {
    //populate: usuario categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate("usuario", "nombre email")
        .populate("categoria", "descripcion")
        .exec((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                producto: productoDB,
            });
        });

    /*
          Producto.findById(id, (err, productoDB) => {
                  if (err) {
                      return res.status(400).json({
                          ok: false,
                          err,
                      });
                  }
                  if (!productoDB) {
                      return res.status(400).json({
                          ok: false,
                          err,
                      });
                  }

                  res.json({
                      ok: true,
                      producto: productoDB,
                  });
              })
              .populate("usuario", "nombre email")
              .populate("categoria", "descripcion");*/
});

//========================
// Crear un nuevo producto  verificaCategoria
//==========================
app.post("/producto", verificaToken, (req, res) => {
    //guardar usuario
    //guardar categoria
    let body = req.body;
    let usuario = req.usuario;
    let categoria = req.categoria;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: Number(body.precioUni),
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: usuario._id,
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            producto: productoDB,
        });
    });
});

//========================
// Actualizar producto
//==========================
app.put("/producto/:id", [verificaToken], (req, res) => {
    //guardar usuario
    //guardar categoria
    let id = req.params.id;
    // arreglo de propiedades validas
    let body = _.pick(req.body, ["nombre", "precioUni", "descripcion"]);

    Producto.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true, context: "query" },
        (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                producto: productoDB,
            });
        }
    );
});

//========================
// Borrar producto
//==========================
app.delete("/producto/:id", verificaToken, (req, res) => {
    //disponible pase a falso
    let id = req.params.id;

    let cambiaEstado = {
        disponible: false,
    };

    Producto.findByIdAndUpdate(
        id,
        cambiaEstado, { new: true },
        (err, productoBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            if (!productoBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Producto no encontrado",
                    },
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: "Producto Borrado",
            });
        }
    );
});

module.exports = app;