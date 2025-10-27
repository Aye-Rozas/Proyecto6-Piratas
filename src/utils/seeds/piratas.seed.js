const piratas = require('../../data/piratas.js'); // ajusta ruta si es necesario
const Piratas = require('../../api/models/piratas.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("conectado a MongoDB");
    const allPiratas = await Piratas.find();
    if (allPiratas.length) {
      await Piratas.collection.drop();
      console.log("colección limpiada");
    }
  })
  .catch((err) => console.log(`error: ${err}`))
  .then(async () => {
    await Piratas.insertMany(piratas);
    console.log(`${piratas.length} piratas insertados`);
  })
  .catch((err) => console.log(`error: ${err}`))
  .finally(() => mongoose.disconnect()); 