const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
// ============================
//   Verificar token
// =============================
let verificaToken = (req, res, next) => {
    let token = req.get("Authorization");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no valido",
                },
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

    //console.log(token);
};
// ============================
//   Verifica AdminRole
// =============================
let verificaAdminRol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role == "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: "Debe ser administrador para realizar esta accion",
            },
        });
    }

    /*

                              Usuario.findOne({ email: usuario.email }, (err, usuarioDB) => {
                                  if (err) {
                                      return res.status(400).json({
                                          ok: false,
                                          err,
                                      });
                                  }
                                  if (usuarioDB.role !== "ADMIN_ROLE") {
                                      return res.status(403).json({
                                          ok: false,
                                          err: {
                                              message: "Debe ser administrador para realizar esta accion",
                                          },
                                      });
                                  }
                                  next();
                              });*/
};

module.exports = {
    verificaToken,
    verificaAdminRol,
};