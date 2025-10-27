const { postPiratas, getPiratas,getPiratasByRecompensa, deletePiratas,updatePiratas }= require("../controllers/piratas");

const piratasRoutes= require("express").Router();

piratasRoutes.post("/", postPiratas);
piratasRoutes.get("/recompensa/:recompensa", getPiratasByRecompensa);
piratasRoutes.get("/", getPiratas);
piratasRoutes.delete("/:id",deletePiratas);
piratasRoutes.put("/:id",updatePiratas);




module.exports=piratasRoutes;