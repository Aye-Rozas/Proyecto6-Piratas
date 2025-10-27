require("dotenv").config();
const express= require("express");
const {connectDB}=require("./src/config/db");
const piratasRoutes = require("./src/api/routes/piratas");
const barcosRoutes = require("./src/api/routes/barcos");


const app=express();

connectDB();
app.use(express.json());

app.use("/api/v1/piratas", piratasRoutes);
app.use("/api/v1/barcos", barcosRoutes);

app.use("/ping",(req,res,next) =>{
  return res.status(200).json("pong");
});

app.use((req,res,next) => {
  return res.status(404).json("Route not found");
});

app.listen(3000,() => {
  console.log("servidor desplegado en http://localhost:3000");
  })