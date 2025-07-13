/* import { crearInterfaz } from "../../interface/scripts/crearInterface.js";
 */
const saltar = document.getElementById("saltar")
/* saltar.addEventListener("click", crearInterfaz) */


/* import { limpiarElemento } from "../../../modulos/extra.js"
import { crearElemento } from "../../../modulos/crearElemento.js"
import { aplicarCss } from "../../../modulos/aplicarCss.js"

const limpiarBody = async () => {
    limpiarElemento(document.body)
    document.body.style.backgroundColor = "rgb(255, 255, 255)"
    document.querySelector("link[href='./app/public/paginas/landing/index.css']").remove()
    document.querySelector("link[href='./app/public/paginas/landing/modal.css']").remove()
}



const crearEstruturaHtml = () => {
    const header = crearElemento(document.body, "header")
    const estilo = {
        width: "100%",
        height: "40px",
        border: "1px solid grey"
    }
    aplicarCss(header, estilo)
}

const dibujarBarraIzq = async () => {
    const barraIzq = crearElemento(document.body.main, "aside", "menuIzq", "menuIzq")
    menuIzq.style.width = "100px"
    menuIzq.style.height = "100vh"
    menuIzq.style.border = "1px solid grey"
    return barraIzq
}



export const crearInterfaz = async () => { 
    await limpiarBody() 
    await crearEstruturaHtml()
    const menuIzq = await dibujarBarraIzq()
}
 */