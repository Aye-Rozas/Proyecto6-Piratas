const mongoose = require("mongoose");

const pirataSchema= new mongoose.Schema(
  {
    name:{ type: String, required: true },
    imgUrl:{ type: String, required: true },
    recompensa:{ type: Number, required: true ,default:0},
    poder: { type: String, required: true },
    barco:{ type: String, required: true },
    rol:{ type: String, required: true },
    fruta: { type: Boolean, required: true },
  },
  {
      timestamps: true,
    collection: "piratas"
  }
)

const Piratas = mongoose.model("piratas", pirataSchema, "piratas");
module.exports = Piratas;