import { animacionEngranajes } from "./animacion.js"
import { nav } from "./nav.js"
import { controlForm } from "./control_form.js"

document.addEventListener("DOMContentLoaded", () => {
    animacionEngranajes()
    nav()
    controlForm()
    console.log(window.eventosLanding)
})

