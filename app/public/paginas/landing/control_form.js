import { iniciarLogin } from "./saludo.js"

const minChar = 4 /* caracteres minimos */

const controlModal = (modal) => {
    const botonLogin = document.getElementById("login")
    const botonComenzar = document.getElementById("comenzar")

    const botonesApertura = [botonLogin, botonComenzar]
    botonesApertura.forEach(item =>
        item.addEventListener("click", () => modal.classList.toggle("modalVisible"))
    )

    const botonCerrar = document.getElementById("cerrar")
    botonCerrar.addEventListener("click", () => modal.classList.toggle("modalVisible"))
}

const activarIconos = (item, accion) => {
    item.style.pointerEvents = accion ? "none" : "auto"
    item.style.cursor = accion ? "auto" : "pointer"
    item.style.opacity = accion ? 0 : 1
}

const cambiarVisibilidad = (item) => {
    const input = item.previousElementSibling
    input.type = input.type === "password"
        ? "text"
        : "password"
}

const comprobarTipo = () => {
    return Array.from(document.querySelectorAll("#tipos .inputOculto")).find(item => item.checked).value
}

const activarBotonEnvio = (boton, accion = null) => {
    boton.disabled = accion === "activar" ? false : true
}

const comprobarInputs = (boton, inputs) => {
    const tipo = comprobarTipo()
    let campos = true
    inputs.forEach((item, num) => {
        const valor = item.value.length
        const iconoVisibilidad = item.nextElementSibling

        if (tipo === "login") { if (num < 2 && valor <= minChar || item.value.includes("ERROR")) campos = false }
        if (tipo === "signUp") { if (num < 3 && valor <= minChar || item.value.includes("ERROR")) campos = false }
        if (inputs[3].checked === false) campos = false
        if (iconoVisibilidad) activarIconos(iconoVisibilidad, valor < 1)
    })
    campos === true ? activarBotonEnvio(boton, "activar") : activarBotonEnvio(boton)
}

const enviarForm = async (campos) => {
    const parametros = new URLSearchParams()
    parametros.append("tipo", comprobarTipo())
    parametros.append("nombre", campos[0].value)
    parametros.append("pass", campos[1].value)
    parametros.append("pass2", campos[2].value)
    parametros.append("idioma", document.querySelector("#idiomas .inputOculto:checked").id)
    const url = "app/php/landing/consultaForm.php"
    return await fetchConsulta(url, parametros)
}

const fetchConsulta = async (url, parametros) => {
    let datos
    try {
        const datosRecibidos = await fetch(
            url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: parametros
        })
        datos = await datosRecibidos.json()
    } catch (error) {
        console.log(error)
    }
    return datos
}

const procesarDatos = (datos, campos) => {
    const tipo = datos["tipo"]
    const nombre = datos["nombre"]
    const pass = datos["pass"]
    console.log(tipo, nombre, pass)

    if (tipo === "login" && !nombre) {
        marcarError(campos[0], "ERROR - El usuario no existe")
        return
    }

    if (tipo === "login" && !pass) {
        marcarError(campos[1], "ERROR - La contraseña no es correcta")
        return
    }

    if (tipo === "signUp" && !nombre) {
        marcarError(campos[0], "ERROR - El usuario ya existe")
        return
    }

    if (tipo === "signUp" && !pass) {
        marcarError(campos[2], "ERROR - Las contraseñas no coinciden")
        return
    }
}

const marcarError = (item, text) => {
    item.value = text
    if (item.id === "password" || item.id === "passwordConfirmado") item.type = "text"
    item.style.color = "rgb(180, 50, 50)"
}

const restaurarError = (item) => {
    if (item.value.includes("ERROR")) {
        const colorInputs = getComputedStyle(document.documentElement).getPropertyValue("--colorInputText")
        item.style.color = colorInputs
        item.autocomplete = "new-password"
        item.value = ""

        if (item.id === "password" || item.id === "passwordConfirmado") item.type = "password"
    }
}

const resetCampos = (campos) => {
    campos.forEach(item => {
        restaurarError(item)
    })
}

/* MAIN ------------------------------------------------------------------------------------- */
const controlForm = () => {

    const modal = document.getElementById("modal")
    const camposForm = Array.from(document.querySelectorAll(".campo"))
    const inputsForm = [...camposForm, document.getElementById("condiciones")]
    const botonEnviar = document.getElementById("botonEnviar")

    controlModal(modal)
    resetCampos(camposForm)
    comprobarInputs(botonEnviar, inputsForm)

    inputsForm.forEach(item => {
        item.addEventListener("input", () => {
            comprobarInputs(botonEnviar, inputsForm)
        })
        item.addEventListener("click", () => {
            restaurarError(item)
        })
    })

    const iconosVisibilidad = Array.from(document.querySelectorAll(".iconoVisibilidad"))
    iconosVisibilidad.forEach(item => {
        item.addEventListener("click", () => {
            cambiarVisibilidad(item)
        })
    })

    const form = document.getElementById("form")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const datos = await enviarForm(camposForm)
        procesarDatos(datos, camposForm)
        comprobarInputs(botonEnviar, inputsForm)
        iniciarLogin( document.getElementById("usuario").value, datos, modal, form)
    })

    form.addEventListener("reset", () => {
        botonEnviar.disabled = true
        iconosVisibilidad.forEach(item => {
            activarIconos(item, true)
            item.previousElementSibling.type = "password"
        })
        resetCampos(camposForm)
    })
}

controlForm()