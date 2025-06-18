const botonInicio = document.getElementById("botonInicio")
const formulario = document.getElementById("modalForm")
const cerrar = document.getElementById("cerrarForm")

const formTipo = Array.from(document.querySelectorAll("form .tipos .inputOculto"))
const enviar = document.getElementById("botonLogin")
const usuario = document.getElementById("user")
const password = document.getElementById("password")
const passwordConfirmed = document.getElementById("passwordConfirmed")
const condiciones = document.getElementById("condiciones")


console.log(enviar)
const abrirForm = () => {
    botonInicio.style.pointerEvents = "none";
    formulario.classList.replace("modalMin", "modalMax")
}

const cerrarForm = () => {
    botonInicio.style.pointerEvents = "auto";
    formulario.classList.replace("modalMax", "modalMin")
}

const verificarForm = () => {
    let datosOk = true
    const form = formTipo.find(item => item.checked).value

    if (usuario.value.length <= 4) datosOk = false
    if (password.value.length <= 4) datosOk = false
    if (!condiciones.checked) datosOk = false
    if (form === "signUp") {
        passwordConfirmed.name = "passwordConfirmed"
        if (passwordConfirmed.value !== password.value) datosOk = false
    } else {
        passwordConfirmed.removeAttribute("name")
    }

    enviar.disabled = datosOk ? false : true
}

const main = () => {
    botonInicio.addEventListener("click", abrirForm)
    cerrar.addEventListener("click", cerrarForm)
    verificarForm()
    formTipo.forEach((item) => { item.addEventListener("change", verificarForm) }); // ojo punto y coma al empezar linea con array
    [usuario, password, passwordConfirmed].forEach((item) => { item.addEventListener("input", verificarForm) })
    condiciones.addEventListener("change", verificarForm)
}

main()