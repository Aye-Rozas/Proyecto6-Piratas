const Piratas= require("../models/piratas");


//? CREATE
const postPiratas = async (req, res, next) => {
  try {
    const newPiratas = new Piratas(req.body);
    const pirataSaved = await newPiratas.save();
    return res.status(201).json(pirataSaved);
  } catch (error) {
    return res.status(400).json(`Error al crear pirata:${error.message}`);
  }
};


//?GET

const getPiratas = async (req, res, next) => {
  try {
    const allPiratas = await Piratas.find();
    return res.status(200).json(allPiratas);
  } catch (error) {
    return res.status(400).json(`Error en busqueda:${error.message}`);
  }
};

const getPiratasByRecompensa = async(req,res, next)=>{
  try {
    const{recompensa}=req.params;
    const piratas= await Piratas.find({recompensa:{$lte:recompensa}});
    return res.status(200).json(piratas);    
  } catch (error) {
    return res.status(400).json(`Error en la solicitud de recompensa:${error.message}`);
  }
}

//?UPDATE
const updatePiratas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const datosActualizados = { ...req.body };
    const up = await Piratas.findByIdAndUpdate(id, datosActualizados, { new: true });
    return res.status(200).json(up);
  } catch (error) {
    return res.status(400).json(`Error al actualizar info de pirata:${error.message}`);
  }
};


//?DELETE
const deletePiratas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pirataDeleted = await Piratas.findByIdAndDelete(id);
    return res.status(200).json(pirataDeleted);
  } catch (error) {
    return res.status(400).json(`Error al eliminar pirata:${error.message}`);
  }
};

module.exports={
  postPiratas,
  getPiratas,
  getPiratasByRecompensa,
  deletePiratas,
  updatePiratas
};