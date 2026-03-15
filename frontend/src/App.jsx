import { useState } from "react"
import Login from "./login"
import Register from "./registre"
import Reporte from "./reporte"

function App(){

const [login,setLogin]=useState(false)
const [registro,setRegistro]=useState(false)

if(!login){

if(registro){
return <Register setRegistro={setRegistro}/>
}

return <Login setLogin={setLogin} setRegistro={setRegistro}/>

}

return(

<div>

<h1>Reportes del campus</h1>

<Reporte/>

</div>

)

}

export default App