const Barcos = require('../models/barcos');

//? CREATE
const postBarcos = async (req, res, next) => {
  try {
    const newBarcos = new Barcos(req.body);
    const barcosSaved = await newBarcos.save();
    return res.status(201).json(barcosSaved);
  } catch (error) {
    return res.status(400).json('Error al crear Barco');
  }
};

//?GET

const getBarcos = async (req, res, next) => {
  try {
    const allBarcos = await Barcos.find().populate('piratas');
    return res.status(200).json(allBarcos);
  } catch (error) {
    return res.status(400).json('Error en busqueda');
  }
};

//?UPDATE
const updateBarcos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldBarco = await Barcos.findById(id);

    if (!oldBarco) {
      return res.status(404).json('Barco no encontrado');
    }

    let nuevosPiratas = [];

    if (req.body.piratas) {
      if (Array.isArray(req.body.piratas)) {
        nuevosPiratas = req.body.piratas;
      } else {
        nuevosPiratas = [req.body.piratas];
      }
    }

    const newBarco = new Barcos(req.body);
    newBarco._id = id;

    const piratasCombinados = [...oldBarco.piratas];

   for (const p of nuevosPiratas) {
      const existe = piratasCombinados.some(
        (pirata) => pirata.toString() === p.toString()
      );
      if (!existe) {
        piratasCombinados.push(p);
      }
    }

    newBarco.piratas = piratasCombinados;

    const barcoUpdated = await Barcos.findByIdAndUpdate(id, newBarco, {
      new: true,
    });
    return res.status(200).json(barcoUpdated);
  } catch (error) {
    return res.status(400).json('Error al actualizar info del barco');
  }
};

//?DELETE
const deleteBarcos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const barcosDeleted = await Barcos.findByIdAndDelete(id);
    return res.status(200).json(barcosDeleted);
  } catch (error) {
    return res.status(400).json('Error al eliminar barco');
  }
};

module.exports = {
  postBarcos,
  getBarcos,
  deleteBarcos,
  updateBarcos,
};
