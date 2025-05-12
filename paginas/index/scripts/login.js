const login = document.getElementById("login")
const botonLogin = document.getElementById("botonLogin")
let usuario = ""
let password = ""
let estadoBoton = false

const cambiarEstadoBoton = () => {
    if (login.value.length > 5) {
        botonLogin.style.backgroundColor = "var(--colorClaro)"
        botonLogin.style.cursor = "pointer"
        botonLogin.style.pointerEvents = "auto"
        botonLogin.querySelector(".icono").style.color = "var(--colorOscuro)"
        estadoBoton = true
    } else {
        botonLogin.style.backgroundColor = "var(--colorOscuro)"
        botonLogin.style.cursor = "auto"
        botonLogin.style.pointerEvents =  "none"
        botonLogin.querySelector(".icono").style.color = "var(--colorClaro)"
        estadoBoton = false
    }
}

const limpiarLogin = () => {login.value = ""}

const guardarDatos = () => {
    if (estadoBoton && usuario === "") {
        usuario = login.value
        login.placeholder = "Contraseña"
    } else if(estadoBoton) {
        password = login.value
        login.placeholder = "VERIFICANDO"
    }

    limpiarLogin()
    usuario !== "" && password !== "" ? login.blur() : login.focus()
    requestAnimationFrame(() => {cambiarEstadoBoton()}) // parche por el render del navegador desincronizado
}

limpiarLogin()
login.addEventListener("input", cambiarEstadoBoton)
login.addEventListener("keydown", (event) => {event.key === "Enter" ? guardarDatos() : null})
botonLogin.addEventListener("click", guardarDatos)