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

const verificarForm = (inputs) => {
    const enviar = document.getElementById("botonLogin")
    const tipo = inputs.find(item => item.name === "tipo" && item.checked).value
    let datosOk = true

    if (inputs[0].value.length <= 4) datosOk = false
    if (inputs[1].value.length <= 4) datosOk = false
    if (!inputs[3].checked) datosOk = false

    // activar el name del input para el envio
    if (tipo === "signUp") {
        console.log("signUp")
        if (inputs[2].value !== inputs[1].value) {
            datosOk = false
            inputs[2].name = "passwordConfirmed"
        }
    } else {
        inputs[2].removeAttribute("name")
    }

    enviar.disabled = datosOk ? false : true
}

const main = () => {
    const abrir = document.getElementById("botonInicio")
    const cerrar = document.getElementById("cerrarForm")
    const campos = Array.from(document.querySelectorAll("form .campos .cajaInput input"))
    const tipoForm = Array.from(document.querySelectorAll("form .cajaTipos .inputOculto"))
    const inputs = [...campos, document.getElementById("condiciones"), ...tipoForm]
    const iconosVisivilidad = Array.from(document.querySelectorAll(".iconoInput"))

    verificarForm(inputs)

        // punto coma forEach desde array directo
        ;[abrir, cerrar].forEach(item => {
            item.addEventListener("click", () => {
                modalAbrirCerrar()
                verificarForm(inputs)
            })
        })

    inputs.forEach(item => {
        item.addEventListener("input", () => {
            verificarForm(inputs)
            activarIconosInput(item)
            restablecerIconos(item)
        })
    })

    tipoForm.forEach(item => {
        item.addEventListener("change", () => verificarForm(inputs))
    })

    iconosVisivilidad.forEach(item => {
        item.addEventListener("click", () => {
            cambiarVisibilidad(item)
        })
    })
}

main()