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

/* ejemplos de modelos para utilizar en Insomnia
  {
    "name": "Thousand Sunny",
    "imgUrl": "https://static.wikia.nocookie.net/onepiece/images/b/b1/Thousand_Sunny_Infobox.png/revision/latest?cb=20200314124830&path-prefix=es ",
    "piratas": [],
    "capitan": "Monkey D. Luffy",
    "material": "Adam Wood",
    "velas": 2,
  },
  {
    "name": "Red Force",
    "imgUrl": " https://static.wikia.nocookie.net/onepiece/images/2/24/Red_Force.png/revision/latest?cb=20240826005937&path-prefix=es ",
    "piratas": [],
    "capitan": "Shanks",
    "material": "Madera reforzada con acero",
    "velas": 3,
  },
  {
    "name": "Big Top",
    "imgUrl": " https://static.wikia.nocookie.net/onepiece/images/a/aa/Big_Top.png/revision/latest?cb=20210130225147&path-prefix=es ",
    "piratas": [],
    "capitan": "Buggy el Payaso",
    "material": "Madera tradicional",
    "velas": 2,
  }
*/