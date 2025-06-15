const formulario = Array.from(document.querySelectorAll("#form .opciones .inputOculto"))
const usuario = document.getElementById("user")
const password = document.getElementById("password")
const passwordConfirmed = document.getElementById("passwordConfirmed")
const condiciones = document.getElementById("condiciones")
const boton = document.getElementById("botonLogin")

const verificarForm = () => {
    let datosOk = true
    const form = formulario.find(item => item.checked).value

    if (usuario.value.length <= 4) datosOk = false
    if (password.value.length <= 4) datosOk = false
    if (!condiciones.checked) datosOk = false
    if (form === "signUp") {
        passwordConfirmed.name = "passwordConfirmed"
        if (passwordConfirmed.value !== password.value) datosOk = false
    } else {
        passwordConfirmed.removeAttribute("name")
    }

    boton.disabled = datosOk ? false : true
}

const main = () => {
    verificarForm()
    formulario.forEach((item) => { item.addEventListener("change", verificarForm) }); // ojo punto y coma al empezar linea con array
    [usuario, password, passwordConfirmed].forEach((item) => { item.addEventListener("input", verificarForm) })
    condiciones.addEventListener("change", verificarForm)
}

main()