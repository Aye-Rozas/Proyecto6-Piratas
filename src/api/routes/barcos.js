const { postBarcos, getBarcos, deleteBarcos, updateBarcos, deletePirataBarco } = require("../controllers/barcos");



const barcosRoutes= require("express").Router();

barcosRoutes.post("/", postBarcos);
barcosRoutes.get("/", getBarcos);
barcosRoutes.delete("/:id/piratas", deletePirataBarco);
barcosRoutes.delete("/:id",deleteBarcos);
barcosRoutes.put("/:id",updateBarcos);




module.exports=barcosRoutes;