import { useState,useEffect } from "react"

function Reporte({usuario}){

const [imagen,setImagen]=useState(null)
const [reportes,setReportes]=useState([])

const enviar = async ()=>{

const formData = new FormData()

formData.append("imagen",imagen)
formData.append("usuario",usuario)

const res = await fetch("http://localhost:3000/reportes",{

method:"POST",

body:formData

})

await res.json()

cargarReportes()

}

const cargarReportes = async ()=>{

const res = await fetch("http://localhost:3000/reportes")

const data = await res.json()

setReportes(data)

}

useEffect(()=>{
cargarReportes()
},[])

const colorUrgencia = (urgencia)=>{

if(urgencia==="Alta") return "red"
if(urgencia==="Media") return "orange"
return "green"

}

return(

<div>

<h3>Usuario: {usuario}</h3>

<input type="file" onChange={(e)=>setImagen(e.target.files[0])}/>

<button onClick={enviar}>
Reportar problema
</button>

<h2>Reportes del campus</h2>

{reportes.map((r)=>(

<div key={r._id}
style={{
border:"1px solid gray",
margin:"10px",
padding:"10px"
}}
>

<p><b>Usuario:</b> {r.usuario}</p>

<p><b>Categoria:</b> {r.categoria}</p>

<p style={{color:colorUrgencia(r.urgencia)}}>

<b>Urgencia:</b> {r.urgencia}

</p>

</div>

))}

</div>

)

}

export default Reporte