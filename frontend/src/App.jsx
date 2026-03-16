import { useState } from "react"
import Login from "./login"
import Register from "./register"
import Reporte from "./reporte"

function App(){

const [login,setLogin]=useState(false)
const [registro,setRegistro]=useState(false)
const [usuario,setUsuario]=useState("")

if(!login){

if(registro){
return <Register setLogin={setLogin} setUsuario={setUsuario}/>
}

return <Login setLogin={setLogin} setUsuario={setUsuario} setRegistro={setRegistro}/>

}

return(

<div>

<h1>Reportes del campus</h1>

<Reporte usuario={usuario}/>

</div>

)

}

export default App