import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

let usuarios = [];
let reportes = [];

// registro
app.post("/registro", (req,res)=>{
 const {usuario,password}=req.body
 usuarios.push({usuario,password})
 res.json({mensaje:"usuario registrado"})
})

// login
app.post("/login",(req,res)=>{
 const {usuario,password}=req.body

 const encontrado=usuarios.find(
  u=>u.usuario===usuario && u.password===password
 )

 if(encontrado){
  res.json({mensaje:"login correcto"})
 }else{
  res.status(401).json({mensaje:"credenciales incorrectas"})
 }
})

// reporte con imagen
app.post("/reportes", upload.single("imagen"), async (req,res)=>{

 try{

 const imageBuffer=fs.readFileSync(req.file.path)

 const prompt=`
 Analiza la imagen y clasifica el problema del campus
 en una categoría: Infraestructura, Limpieza, Seguridad,
 Tecnología o Servicios.
 Responde solo con la categoría.
 `

 const result=await model.generateContent([
  prompt,
  {
   inlineData:{
    data:imageBuffer.toString("base64"),
    mimeType:req.file.mimetype
   }
  }
 ])

 const categoria=result.response.text()

 const nuevoReporte={
  id:reportes.length+1,
  categoria
 }

 reportes.push(nuevoReporte)

 res.json(nuevoReporte)

 }catch(error){
  res.status(500).json({error:"error analizando imagen"})
 }

})

app.get("/reportes",(req,res)=>{
 res.json(reportes)
})

app.listen(3000,()=>{
 console.log("Servidor corriendo en puerto 3000")
})