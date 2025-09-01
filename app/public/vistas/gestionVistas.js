import { vistaLanding } from "./landing/vistaLanding.js"

const insertarComp = (elemento, componente) => {
    const nombreComponente = `<${componente}></${componente}>`
    return elemento.innerHTML = nombreComponente
}   

document.addEventListener("DOMContentLoaded", () => {
   const vistaLanding = insertarComp(document.body, "vista-landing")
})

