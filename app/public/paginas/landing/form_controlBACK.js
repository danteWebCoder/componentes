import { crearElemento } from "/componentes/app/public/modulos/crearElemento.js"

const modal = document.getElementById("modalForm")
const form = document.getElementById("form")
const abrir = document.getElementById("botonInicio")
const cerrar = document.getElementById("cerrarForm")
const campos = Array.from(document.querySelectorAll("form .campos .cajaInput input"))
const tipoForm = Array.from(document.querySelectorAll("form .cajaTipos .inputOculto"))
const inputs = [...campos, document.getElementById("condiciones"), ...tipoForm]
const iconosVisivilidad = Array.from(document.querySelectorAll(".iconoInput"))
const color = window.getComputedStyle(campos[0]).color
const condiciones = document.getElementById("condiciones")
const reset = document.getElementById("reset")
const enviar = document.getElementById("botonLogin")
const idioma = document.getElementById("idiomaDefecto").value

const modalAbrirCerrar = () => {
    const visible = modal.classList.contains("modalMin")

    if (visible) {
        botonInicio.style.pointerEvents = "none";
        modal.classList.replace("modalMin", "modalMax")
    } else {
        botonInicio.style.pointerEvents = "auto";
        modal.classList.replace("modalMax", "modalMin")
    }
}

const activarIconosInput = (item) => {
    if (item.value.length > 0 && item.nextElementSibling) {
        item.nextElementSibling.textContent = "visibility"
    } else if (item.nextElementSibling) {
        item.nextElementSibling.textContent = ""
    }
}

const cambiarVisibilidad = (item) => {
    const input = item.previousElementSibling
    input.type = input.type === "password" ? "text" : "password"
    cambiarIconos(item)
}

const cambiarIconos = (item) => {
    item.textContent = item.textContent === "visibility" ? "visibility_off" : "visibility"
}

const restablecerIconos = (item) => {
    const icono = item.nextElementSibling
    if (icono && item.value.length === 0) {
        icono.textContent = ""
        icono.previousElementSibling.type = "password"
    }
}

const verificarBoton = () => {
    const camposForm = Array.from(document.querySelectorAll(".cajaInput .campo"))
    const tipoForm = Array.from(document.querySelectorAll(".cajaTipos .inputOculto")).find(item => item.name === "tipo" && item.checked).value
/*     const enviar = document.getElementById("botonLogin")
 */    
    let datosOk = true

    if (camposForm[0].value.length <= 4) datosOk = false
    if (camposForm[1].value.length <= 4) datosOk = false
    if (condiciones.checked === false) datosOk = false

    if (tipoForm === "signUp" && camposForm[2].value.length <= 4) {
        datosOk = false
        // activar el name del input para el envio
        camposForm[2].name = "passConfirmed"
    } else { camposForm[2].removeAttribute("name") }

    camposForm.forEach(item => {
        if (item.value.includes("ERROR")) datosOk = false
    })

    enviar.disabled = datosOk ? false : true
}

const marcarError = (item, mensaje) => {
    item.value = mensaje
    item.type = "text"
    item.style.color = "red"
}

const restaurarError = (item, color) => {
    if (item.value.includes("ERROR")) {
        item.value = ""
        item.style.color = color
        item.type = item.id === "password" || item.id === "passwordConfirmed" ? "password" : "text"
    }
}

const saludarUsuario = () => {
    const parametros = new URLSearchParams(window.location.search)
    const usuarioAlta = parametros.get("usuario")

    if (usuarioAlta) {
        const input = document.getElementById("user")
        input.value = usuarioAlta
        input.readOnly = true
        input.style.cursor = "context-menu"
        input.style.color = "rgb(51, 170, 67)"
        input.style.textAlign = "center"
        input.style.fontSize = "18px"
        input.style.letterSpacing = "4px"

        const cajaUser = document.getElementById("cajaUser")
        cajaUser.style.backgroundColor = "rgb(37, 37, 37)"

        const modal = document.getElementById("modalForm")

        const cuentaNueva = document.getElementById("cuentaNueva")
        cuentaNueva.style.pointerEvents = "none"
        cuentaNueva.style.opacity = 0

        const inputPass = document.getElementById("password")
        inputPass.focus()
        inputPass.autocomplete = "off"

        const inputPassword = document.getElementById("password")
        inputPassword.value = ""

        const condiciones = document.getElementById("condiciones")
        condiciones.checked = true

        const noRecuerda = document.getElementById("noRecuerda")
        noRecuerda.style.display = "none"

        modal.style.transition = 0
        modalAbrirCerrar()
        const campoBienvenida = document.getElementById("campoBienvenidaBienvenida")
        const spanTexto1 = crearElemento(campoBienvenida, "span", "material-symbols-outlined")
        spanTexto1.textContent = "favorite"
        const spanTexto2 = crearElemento(campoBienvenida, "span")
        spanTexto2.textContent = usuarioAlta.toUpperCase()
        spanTexto1.style.fontSize = "60px"
        spanTexto2.style.fontSize = "30px"
    }
}

const bienvenida = (itemForm, itemCerrar) => {
    itemForm.style.display = "none"
    itemCerrar.style.display = "none"
}

const mainForm = () => {

    saludarUsuario()

    verificarBoton()
        // punto coma forEach desde array directo
        ;[abrir, cerrar].forEach(item => {
            item.addEventListener("click", () => {
                modalAbrirCerrar()
                verificarBoton()
            })
        })

    inputs.forEach(item => {
        item.addEventListener("input", () => {
            verificarBoton(inputs)
            activarIconosInput(item)
            restablecerIconos(item)
        })
    })

    tipoForm.forEach(item => {
        item.addEventListener("change", () => verificarBoton())
    })

    iconosVisivilidad.forEach(item => {
        item.addEventListener("click", () => {
            cambiarVisibilidad(item)
        })
    })

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const tipo = tipoForm.find(item => item.name === "tipo" && item.checked).value
        const usuario = campos[0]
        const password = campos[1]
        const password2 = campos[2]

        let usuarioBD
        let passwordBD
        let compararPass

        // LOGIN ---------------------------------

        const parametrosLogin = new URLSearchParams()
        parametrosLogin.append("tipo", tipo)
        parametrosLogin.append("nombre", campos[0].value)
        parametrosLogin.append("pass", campos[1].value)
        parametrosLogin.append("idioma", idioma)
        const consultaLogin = "app/php/landing/consultaForm.php?" + parametrosLogin.toString()

        if (tipo === "login") {
            const consulta = await fetch(consultaLogin)
            const respuesta = await consulta.json()
            usuarioBD = respuesta["nombre"]
            passwordBD = respuesta["pass"]

            if (usuarioBD === false) {
                marcarError(usuario, "ERROR: El usuario no existe")
                usuario.addEventListener("click", (e) => {
                    restaurarError(e.target, color)
                })
            }

            if (usuarioBD === true && passwordBD === false) {
                marcarError(password, "ERROR: La contraseña no es correcta")
                password.addEventListener("click", (e) => {
                    restaurarError(e.target, color)
                })
            }

            if (usuarioBD === true && passwordBD === true) {
                /*                 const url = "/componentes/app/php/landing/form_redirigir.php"
                                const formOculto = crearElemento(form, "form", null, null, { "method": "POST", "action": url })
                                formOculto.style.display = "none"
                                const inputAccion = crearElemento(formOculto, "input", null, null, { "name": "accion", "type": "hidden", "value": "login" })
                                const inputUsuario = crearElemento(formOculto, "input", null, null, { "name": "usuario", "type": "hidden", "value": usuario.value })
                                const inputIdioma = crearElemento(formOculto, "input", null, null, { "name": "idioma", "type": "hidden", "value": idioma })
                                formOculto.submit()
                 */
                bienvenida()

            }
        }

        // SIGN UP ------------------------------

        const parametrosSignUp = new URLSearchParams()
        parametrosSignUp.append("tipo", tipo)
        parametrosSignUp.append("nombre", campos[0].value)
        parametrosSignUp.append("pass", campos[1].value)
        parametrosSignUp.append("pass2", campos[2].value)
        parametrosSignUp.append("idioma", idioma)
        const consultaSignUp = "app/php/landing/consultaForm.php?" + parametrosSignUp.toString()

        if (tipo === "signUp") {
            const consulta = await fetch(consultaSignUp)
            const respuesta = await consulta.json()
            console.log(respuesta)
            usuarioBD = respuesta["nombre"]
            compararPass = respuesta["compararPass"]

            if (usuarioBD === false) {
                marcarError(usuario, "ERROR: El usuario ya existe")
                usuario.addEventListener("click", (e) => {
                    restaurarError(e.target, color)
                })
                verificarBoton()
            }

            if (compararPass === false) {
                marcarError(password2, "ERROR: Las contraseñas no coinden")
                password2.addEventListener("click", (e) => {
                    restaurarError(e.target, color)
                })
            }

            if (usuarioBD === true && compararPass === true) {
                const url = `/componentes/app/php/landing/form_redirigir.php?accion=signUp&usuario=${usuario.value}&pass=${password.value}&idioma=${idioma}`
                console.log(url)
                const formOculto = crearElemento(form, "form", null, null, { "method": "POST", "action": url })
                formOculto.style.display = "none"
                const inputAccion = crearElemento(formOculto, "input", null, null, { "name": "accion", "type": "hidden", "value": "signUp" })
                const inputUsuario = crearElemento(formOculto, "input", null, null, { "name": "usuario", "type": "hidden", "value": usuario.value })
                const inputIdioma = crearElemento(formOculto, "input", null, null, { "name": "idioma", "type": "hidden", "value": idioma })
                formOculto.submit()
            }
        }

        reset.addEventListener("click", () => {
            restaurarError(campos[0], color)
            restaurarError(campos[1], color)
            restaurarError(campos[2], color)
        })
    })
}

mainForm()