import { vistaLanding } from "./landing/vistaLanding.js"

const insertarComp = (elemento, componente) => {
    const string = `<${componente}></${componente}>`
    return elemento.innerHTML = string
}   

document.addEventListener("DOMContentLoaded", () => {
   const vistaLanding = insertarComp(document.body, "vista-landing")
})

