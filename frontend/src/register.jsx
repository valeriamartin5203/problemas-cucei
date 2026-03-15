import { useState } from "react"

function Register({setRegistro}){

const [usuario,setUsuario]=useState("")
const [password,setPassword]=useState("")

const registrar = async ()=>{

const res = await fetch("http://localhost:3000/registro",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
usuario,
password
})

})

const data = await res.json()

alert(data.mensaje)

setRegistro(false)

}

return(

<div>

<h2>Registro</h2>

<input
placeholder="usuario"
onChange={(e)=>setUsuario(e.target.value)}
/>

<input
type="password"
placeholder="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={registrar}>
Registrar
</button>

</div>

)

}

export default Register