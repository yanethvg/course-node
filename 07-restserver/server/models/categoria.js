const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, "La descripción es obligatoria"],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
});

// para que agregue la validación de cada uno de los atributos
categoriaSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("Categoria", categoriaSchema);