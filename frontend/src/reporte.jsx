import { useState } from "react"

function Reporte(){

const [imagen,setImagen]=useState(null)
const [categoria,setCategoria]=useState("")


const enviar = async ()=>{

const formData = new FormData()

formData.append("imagen",imagen)

const res = await fetch("http://localhost:3000/reportes",{

method:"POST",

body:formData

})

const data = await res.json()

setCategoria(data.categoria)

}

return(

<div>

<h2>Reportar problema</h2>

<input
type="file"
onChange={(e)=>setImagen(e.target.files[0])}
/>

<button onClick={enviar}>
Analizar problema
</button>

{categoria && (
<h3>Problema detectado: {categoria}</h3>
)}

</div>

)

}

export default Reporte