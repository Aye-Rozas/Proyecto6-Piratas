const mongoose= require("mongoose");

const connectDB = async () => {
try {  console.log("DB_URL:", process.env.DB_URL); 
  await mongoose.connect(process.env.DB_URL)
  console.log("funciona");
  
} catch (error) {
  console.log("Error conectando con la BBDD", error);
  
}
}
module.exports={ connectDB};