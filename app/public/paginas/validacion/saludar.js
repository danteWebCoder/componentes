import { crearElemento } from "./../../modulos/crearElemento.js"
import { esperar } from "./../../modulos/tiempo.js"

const parametros = new URLSearchParams(window.location.search)
const cajaNombre = document.getElementById("cajaUsuario")
const cajaTexto1 = document.getElementById("texto1")
const cajaTexto2 = document.getElementById("cajaUsuario")

const escribir = async (string, contenedor, size) => {
    console.log(size)

    const letras = [...string]
    const numChars = letras.length
    for (let i = 0; i < numChars; i++) {
        const caja = crearElemento(contenedor, "div")
        caja.style.width = "50px"
        caja.style.height = "50px"
        caja.style.display = "flex"
        caja.style.alignItems = "center"
        caja.style.justifyContent = "center"
        caja.style.border = "1px solid grey"

        const cajaChar = crearElemento(caja, "div")
        cajaChar.style.color = "black"
        cajaChar.textContent = letras[i]
        cajaChar.style.fontSize = `${size * 6}rem`
        cajaChar.style.opacity = 0
        cajaChar.style.fontWeight = "bolder"
        cajaChar.style.textShadow = "0 0 2px rgb(146, 146, 146), 0 0 2px rgb(146, 146, 146), 0 0 6px rgb(146, 146, 146)"
        cajaChar.style.filter = "blur(10px)"
/*         cajaChar.style.border = "1px solid grey"
 */    }
    const cajas = Array.from(contenedor.querySelectorAll("*"))
    await esperar(100)

    let i = 0
    for (const caja of cajas) {
        caja.style.color = "white"
        caja.style.fontSize = `${size}rem`
        caja.style.opacity = 1
        caja.style.filter = "blur(0px)"
        caja.style.transition = ".5s"

        i += 1
        await esperar(50)
    }
}

escribir("HOLA", cajaTexto1, 3)
escribir(parametros.get("usuario").toUpperCase(), cajaTexto2, 3)




