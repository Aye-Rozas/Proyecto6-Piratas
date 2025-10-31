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

    const datosActualizados = { ...req.body };
    
    let nuevosPiratas = [];

    if (req.body.piratas) {
      if (Array.isArray(req.body.piratas)) {
        nuevosPiratas = req.body.piratas;
      } else {
        nuevosPiratas = [req.body.piratas];
      }
      
      delete datosActualizados.piratas;
      
      const barcoUpdated = await Barcos.findByIdAndUpdate(
        id, 
        {
          ...datosActualizados,
          $addToSet: { piratas: { $each: nuevosPiratas } }
        },
        { new: true }
      );
      return res.status(200).json(barcoUpdated);
    }

    const barcoUpdated = await Barcos.findByIdAndUpdate(id, datosActualizados, {
      new: true,
    });
    return res.status(200).json(barcoUpdated);
  } catch (error) {
    return res.status(400).json(`Error al actualizar info del barco:${error.message}`);
  }
};

//? DELETE PIRATA

const deletePirataBarco = async(req,res,next)=>{
  try {
    const { id } = req.params;
    const oldBarco = await Barcos.findById(id);

    if (!oldBarco) {
      return res.status(404).json(`Barco no encontrado:${error.message}`);
    }

    let piratasAEliminar = [];

    if (req.body.piratas) {
      if (Array.isArray(req.body.piratas)) {
        piratasAEliminar = req.body.piratas;
      } else {
        piratasAEliminar = [req.body.piratas];
      }
    }

    const barcoUpdated = await Barcos.findByIdAndUpdate(
      id,
      {
        $pull: { piratas: { $in: piratasAEliminar } }
      },
      { new: true }
    );

    return res.status(200).json(barcoUpdated);
  } catch (error) {
    return res.status(400).json(`Error al eliminar piratas del barco:${error.message}`);
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
  deletePirataBarco,
  updateBarcos,
};
