import { vistaBase } from "./../../../comunes/scripts/clases/vistaBase.js" /* para debug */
import * as datos from "./formDatos.js"

const tipoSeleccionado = (dom) => {
    return Array.from(dom.querySelectorAll(".tipo .inputOculto")).find(item => item.checked === true).value
}

const activarIconos = (item) => {
    const escrito = item.value.length ? true : false
    item.nextElementSibling.style.pointerEvents = escrito ? "auto" : "none"
    item.nextElementSibling.style.cursor = escrito ? "pointer" : "auto"
    item.nextElementSibling.style.opacity = escrito ? 1 : 0
}

const cambiarVisibilidad = (item) => {
    const input = item.previousElementSibling
    input.type = input.type === "password" ? "text" : "password"
}

const actDesBoton = (boton, accion) => {
    if (accion === "activar") boton.classList.remove("boton2Des")
    if (accion === "desactivar") boton.classList.add("boton2Des")
    if (boton.id === "solicitarPass") {
        boton.style.pointerEvents = accion === "activar" ? "auto" : "none"
    }
}

const comprobarCondiciones = (dom) => {
    return dom.getElementById("condicionesCheck").checked
}

const comprobarMail = (item) => {
    return item.length >= 5 ? true : false
}

const comprobarCampos = (dom, inputs, botones) => {
    const tipo = tipoSeleccionado(dom)
    const mail = inputs[0].value
    const pass = inputs[1].value
    const passRep = inputs[2].value
    const reset = botones[0]
    const enviar = botones[1]
    const solicitarPass = botones[2]

    /*     const mailValido = (/^.{3,}@.{2,}\.[a-zA-Z0-9]{2,}$/).test(mail)
     */
    const mailValido = comprobarMail(mail)
    const passValido = pass.length >= 5 ? true : false
    const passRepValido = passRep.length >= 5 ? true : false
    const condicionesValido = comprobarCondiciones(dom)

    mailValido
        ? actDesBoton(solicitarPass, "activar")
        : actDesBoton(solicitarPass, "desactivar")

    mail || pass || passRep
        ? actDesBoton(reset, "activar")
        : actDesBoton(reset, "desactivar")

    if (tipo === "login") {
        mailValido && passValido && condicionesValido
            ? actDesBoton(enviar, "activar")
            : actDesBoton(enviar, "desactivar")
    }

    if (tipo === "signUp") {
        mailValido && passValido && passRepValido && condicionesValido
            ? actDesBoton(enviar, "activar")
            : actDesBoton(enviar, "desactivar")
    }
}

const marcarError = (item, text) => {
    item.value = text
    item.classList.add("error")

    if (item.id.startsWith("pass")) {
        item.type = "text"
        item.nextElementSibling.style.pointerEvents = "none"
    }
}

const desmarcarError = (item) => {
    if (item.classList.contains("error")) {
        item.classList.remove("error")
        item.value = ""
        if (item.id.startsWith("pass")) {
            item.type = "password"
            item.nextElementSibling.style.pointerEvents = "auto"
        }
    }
}

const revisarForm = (campos, respuestaServidor) => {
    const respuesta = JSON.parse(respuestaServidor)
    if (respuesta.tipo === "login" && respuesta.correo !== "existe") { marcarError(campos[0], "El correo no existe"); return }
    if (respuesta.tipo === "login" && respuesta.pass === "incorrecto") { marcarError(campos[1], "Contraseña incorrecta"); return }
    if (respuesta.tipo === "signUp" && respuesta.correo === "existe") { marcarError(campos[0], "Este correo ya esta registrado"); return }
    if (respuesta.tipo === "signUp" && respuesta.passRep === "diferente") { marcarError(campos[2], "Las contaseñas no coinciden"); return }
}

export const mainControlForm = async (dom, clase) => {

    const iconosVisibilidad = Array.from(dom.querySelectorAll(".iconoForm:last-child"))
    const inputsForm = Array.from(dom.querySelectorAll("#formLanding input"))
    const inputsCampo = inputsForm.filter(item => item.classList.contains("inputForm"))
    const inputsPass = inputsForm.filter(item => item.type === "password")
    const botonEnvio = dom.getElementById("botonEnvio")
    const botonReset = dom.getElementById("botonReset")
    const botonSolicitarPass = dom.getElementById("solicitarPass")
    const botones = [botonReset, botonEnvio, botonSolicitarPass]

    comprobarCampos(dom, inputsCampo, botones)

    /* CONTROL FORM */
    inputsPass.forEach(item => clase.crearEvento(item, "input", () => activarIconos(item)))
    iconosVisibilidad.forEach(item => clase.crearEvento(item, "click", () => cambiarVisibilidad(item)))
    inputsForm.forEach(item => clase.crearEvento(item, "input", () => { comprobarCampos(dom, inputsCampo, botones) }))
    inputsForm.forEach(item => clase.crearEvento(item, "click", () => { desmarcarError(item) }))
    clase.crearEvento(botonReset, "click", () => dom.getElementById("formLanding").reset())
    clase.crearEvento(botonSolicitarPass, "click", () => { solicitarPass() })

    /* CONTROL ENVIO y RECEPCION DATOS */
    clase.crearEvento(botonEnvio, "click", async () => {
        const respuestaServidor = await datos.enviarForm(tipoSeleccionado(dom), inputsCampo)
        console.log(respuestaServidor)
        revisarForm(inputsCampo, respuestaServidor)
    })
}