import { useState } from "react"

function Register({setLogin,setUsuario}){

const [user,setUser]=useState("")
const [password,setPassword]=useState("")
const [mensaje,setMensaje]=useState("")

const registrar = async ()=>{

const res = await fetch("http://localhost:3000/registro",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
usuario:user,
password
})

})

const data = await res.json()

if(res.ok){

setUsuario(user)

setLogin(true)

}else{

setMensaje(data.mensaje)

}

}

return(

<div>

<h2>Registro</h2>

<input placeholder="usuario" onChange={(e)=>setUser(e.target.value)}/>

<input type="password" onChange={(e)=>setPassword(e.target.value)}/>

<button onClick={registrar}>
Registrar
</button>

<p style={{color:"red"}}>
{mensaje}
</p>

</div>

)

}

export default Register