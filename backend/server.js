import express from "express"
import cors from "cors"
import multer from "multer"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import fs from "fs"

import { GoogleGenerativeAI } from "@google/generative-ai"

import User from "./models/user.js"
import Reporte from "./models/reporte2.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

if(!fs.existsSync("uploads")){
fs.mkdirSync("uploads")
}

const upload = multer({dest:"uploads/"})

mongoose.connect("mongodb://127.0.0.1:27017/campus-reportes")

.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.log(err))

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
model:"gemini-1.5-flash"
})


app.post("/registro", async(req,res)=>{

const {usuario,password}=req.body

if(!usuario || !password){
return res.status(400).json({mensaje:"Debes llenar todos los campos"})
}

const existe = await User.findOne({usuario})

if(existe){
return res.status(400).json({mensaje:"El usuario ya existe"})
}

const hash = await bcrypt.hash(password,10)

const nuevoUsuario = new User({
usuario,
password:hash
})

await nuevoUsuario.save()

res.json({
mensaje:"usuario registrado",
login:true
})

})


app.post("/login", async(req,res)=>{

const {usuario,password}=req.body

if(!usuario || !password){
return res.status(400).json({mensaje:"Faltan datos"})
}

const user = await User.findOne({usuario})

if(!user){
return res.status(401).json({mensaje:"Usuario incorrecto"})
}

const valido = await bcrypt.compare(password,user.password)

if(!valido){
return res.status(401).json({mensaje:"Contraseña incorrecta"})
}

res.json({
mensaje:"Login correcto",
login:true
})

})


app.post("/reportes", upload.single("imagen"), async(req,res)=>{

try{

const {usuario}=req.body

const imageBuffer = fs.readFileSync(req.file.path)

const prompt = `
Analiza la imagen del campus.

Responde en JSON con:

categoria: Infraestructura, Limpieza, Seguridad, Tecnología o Servicios
urgencia: Baja, Media o Alta

{
"categoria":"",
"urgencia":""
}
`

const result = await model.generateContent([
prompt,
{
inlineData:{
data:imageBuffer.toString("base64"),
mimeType:req.file.mimetype
}
}
])

const respuesta = result.response.text()

const datos = JSON.parse(respuesta)

const nuevoReporte = new Reporte({

usuario,
categoria:datos.categoria,
urgencia:datos.urgencia,
imagen:req.file.filename

})

await nuevoReporte.save()

res.json(nuevoReporte)

}catch(error){

console.log(error)

res.status(500).json({error:"error analizando imagen"})

}

})


app.get("/reportes", async(req,res)=>{

const lista = await Reporte.find()

res.json(lista)

})


app.listen(3000,()=>{

console.log("Servidor corriendo en puerto 3000")

})