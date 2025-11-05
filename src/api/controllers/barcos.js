const Barcos = require('../models/barcos');

//? CREATE
const postBarcos = async (req, res, next) => {
  try {
    const newBarcos = new Barcos(req.body);
    const barcosSaved = await newBarcos.save();
    return res.status(201).json(barcosSaved);
  } catch (error) {
    return res.status(400).json(`Error al crear Barco:${error.message}`);
  }
};

//?GET

const getBarcos = async (req, res, next) => {
  try {
    const allBarcos = await Barcos.find().populate('piratas');
    return res.status(200).json(allBarcos);
  } catch (error) {
    return res.status(400).json(`Error en busqueda:${error.message}`);
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
    const operacionesMongo = {};
    const { agregarPiratas, eliminarPiratas, ...datosActualizados } = req.body;

    if (Object.keys(datosActualizados).length > 0) {
      operacionesMongo.$set = datosActualizados;
    }

    if (agregarPiratas) {
      let piratasArray;

      if (Array.isArray(agregarPiratas)) {
        piratasArray = agregarPiratas;
      } else {
        piratasArray = [agregarPiratas];
      }

      if (!operacionesMongo.$addToSet) {
        operacionesMongo.$addToSet = {};
      }

      operacionesMongo.$addToSet.piratas = { $each: piratasArray };
    }

    if (eliminarPiratas) {
      let piratasArray;

      if (Array.isArray(eliminarPiratas)) {
        piratasArray = eliminarPiratas;
      } else {
        piratasArray = [eliminarPiratas];
      }

      if (!operacionesMongo.$pull) {
        operacionesMongo.$pull = {};
      }

      operacionesMongo.$pull.piratas = { $in: piratasArray };
    }

    if (Object.keys(operacionesMongo).length === 0) {
      return res.status(400).json('No hay datos para actualizar');
    }

    const barcoUpdated = await Barcos.findByIdAndUpdate(id, operacionesMongo, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(barcoUpdated);
  } catch (error) {
    return res.status(400).json(`Error al actualizar info del barco: ${error.message}`);
  }
};

//?DELETE
const deleteBarcos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const barcosDeleted = await Barcos.findByIdAndDelete(id);
    return res.status(200).json(barcosDeleted);
  } catch (error) {
    return res.status(400).json(`Error al eliminar barco:${error.message}`);
  }
};

module.exports = {
  postBarcos,
  getBarcos,
  deleteBarcos,
  updateBarcos,
};
