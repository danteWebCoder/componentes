const modalAbrirCerrar = () => {
    const modal = document.getElementById("modalForm")
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
    const enviar = document.getElementById("botonLogin")
    const condiciones = document.getElementById("condiciones")
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


const mainForm = () => {
    const form = document.getElementById("form")
    const abrir = document.getElementById("botonInicio")
    const cerrar = document.getElementById("cerrarForm")
    const campos = Array.from(document.querySelectorAll("form .campos .cajaInput input"))
    const tipoForm = Array.from(document.querySelectorAll("form .cajaTipos .inputOculto"))
    const inputs = [...campos, document.getElementById("condiciones"), ...tipoForm]
    const iconosVisivilidad = Array.from(document.querySelectorAll(".iconoInput"))
    const color = window.getComputedStyle(campos[0]).color
    const reset = document.getElementById("reset")

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
        const parametros = new URLSearchParams()
        parametros.append("tipo", tipo)
        parametros.append("nombre", campos[0].value)
        parametros.append("pass", campos[1].value)
        parametros.append("pass2", campos[2].value)
        parametros.append("idioma", document.getElementById("idiomaDefecto").value)
        const nuevoAction = "app/php/landing/consultaBD.php?" + parametros.toString()

        const usuario = campos[0]
        const password = campos[1]
        const password2 = campos[2]
        const consulta = await fetch(nuevoAction)
        const respuesta = await consulta.json()

        console.log(respuesta)

        const usuarioBD = respuesta["nombre"]
        const passwordBD = respuesta["pass"]
        const passwordBD2 = respuesta["pass2"]

        //login -----------------------------------------
        if (tipo === "login" && usuarioBD === false) {
            marcarError(usuario, "ERROR: El usuario no existe")
            usuario.addEventListener("click", (e) => {
                restaurarError(e.target, color)
            })
        }

        if (tipo === "login" && usuarioBD === true && passwordBD === false) {
            marcarError(password, "ERROR: La contraseña no es correcta")
            password.addEventListener("click", (e) => {
                restaurarError(e.target, color)
            })
        }

        if (tipo === "login" && usuarioBD === true && passwordBD === true) {
            window.location.href = respuesta["url"]
        }

        // signUp --------------------------------------
        if (tipo === "signUp" && usuarioBD === true) {
            marcarError(usuario, "ERROR: El usuario ya existe")
            usuario.addEventListener("click", (e) => {
                restaurarError(e.target, color)
            })
            verificarBoton()
        }

        if (tipo === "signUp" && usuarioBD === false && passwordBD2 === false) {
            marcarError(password2, "ERROR: Las contraseñas no coinden")
            password2.addEventListener("click", (e) => {
                restaurarError(e.target, color)
            })
        }

        if (tipo === "signUp" && usuarioBD === false && passwordBD2 === true) {
            window.location.href = respuesta["url"]
        }

        reset.addEventListener("click", () => {
            restaurarError(campos[0], color)
            restaurarError(campos[1], color)
            restaurarError(campos[2], color)
        })
    })
}

mainForm()