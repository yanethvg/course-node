const Categoria = require("../models/categoria");

// ============================
//   Verificar Categoria
// =============================
let verificaCategoria = (req, res, next) => {
    let categoria = req.body.categoria;

    Categoria.findById(categoria, (err, categoriaDB) => {
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El ID de la categoria no existe",
                },
            });
        } else {
            req.categoria = categoriaDB;
            next();
        }
    });
};

module.exports = {
    verificaCategoria,
};