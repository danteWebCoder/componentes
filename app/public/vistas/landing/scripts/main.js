import { animacionEngranajes } from "./animacion.js"
import { nav } from "./nav.js"
import { controlForm } from "./control_form.js"
import * as eventos from "./../../../comunes/scripts/modulos/eventos.js"

document.addEventListener("DOMContentLoaded", () => {
    const eventosLanding = []
    animacionEngranajes()
    nav()
    controlForm(eventosLanding)

    console.log("eventos:", eventosLanding)

})

