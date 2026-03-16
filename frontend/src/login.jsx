import { useState } from "react"

function Login({setLogin,setUsuario,setRegistro}){

const [user,setUser]=useState("")
const [password,setPassword]=useState("")
const [mensaje,setMensaje]=useState("")

const entrar = async ()=>{

const res = await fetch("http://localhost:3000/login",{

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

<h2>Login</h2>

<input placeholder="usuario" onChange={(e)=>setUser(e.target.value)}/>

<input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

<button onClick={entrar}>
Entrar
</button>

<button onClick={()=>setRegistro(true)}>
Registrarse
</button>

<p style={{color:"red"}}>
{mensaje}
</p>

</div>

)

}

export default Login