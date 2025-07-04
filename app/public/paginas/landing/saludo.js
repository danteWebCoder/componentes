import { esperar } from "./../../modulos/tiempos.js"

export const iniciarLogin = async (usuari, datos, modal, form) => {
    if (datos["tipo"] && datos["nombre"] && datos["pass"]) {

        form.style.transition = "1s"
        form.style.opacity = 0
        await esperar(1000)
        console.log(modal)
        modal.style.backgroundColor = "white"
        modal.style.backdropFilter = "blur(0)"
        modal.style.transition = "1s 1s"
    }
}
