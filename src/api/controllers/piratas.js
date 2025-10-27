const Piratas= require("../models/piratas");


//? CREATE
const postPiratas = async (req, res, next) => {
  try {
    const newPiratas = new Piratas(req.body);
    const pirataSaved = await newPiratas.save();
    return res.status(201).json(pirataSaved);
  } catch (error) {
    return res.status(400).json("Error al crear pirata");
  }
};


//?GET

const getPiratas = async (req, res, next) => {
  try {
    const allPiratas = await Piratas.find();
    return res.status(200).json(allPiratas);
  } catch (error) {
    return res.status(400).json("Error en busqueda");
  }
};

const getPiratasByRecompensa = async(req,res, next)=>{
  try {
    const{recompensa}=req.params;
    const piratas= await Piratas.find({recompensa:{$lte:recompensa}});
    return res.status(200).json(piratas);    
  } catch (error) {
     return res.status(400).json("Error en la solicitud de recompensa");
  }
}

//?UPDATE
const updatePiratas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newPirata = new Piratas(req.body);
    newPirata._id = id;
    const up = await Piratas.findByIdAndUpdate(id, newPirata, { new: true });
    return res.status(200).json(up);
  } catch (error) {
    return res.status(400).json("Error al actualizar info de pirata");
  }
};


//?DELETE
const deletePiratas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pirataDeleted = await Piratas.findByIdAndDelete(id);
    return res.status(200).json(pirataDeleted);
  } catch (error) {
    return res.status(400).json("Error al eliminar pirata");
  }
};

module.exports={
  postPiratas,
  getPiratas,
  getPiratasByRecompensa,
  deletePiratas,
  updatePiratas
};