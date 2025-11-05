const mongoose = require('mongoose');

const barcosSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    piratas: [
      { type: mongoose.Types.ObjectId, ref: "piratas", required: false },
    ],
    capitan: { type: String, required: true },
    material: { type: String, required: true },
    velas: { type: Number, required: true },
  },

  {
    timestamps: true,
    collection: 'barcos',
  },
);

const Barcos = mongoose.model('barcos', barcosSchema, 'barcos');
module.exports = Barcos;
