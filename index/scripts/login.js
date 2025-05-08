const login = document.getElementById("login")
const botonLogin = document.getElementById("botonLogin")
let usuario = ""
let password = ""
let estadoBoton = false

const cambiarEstadoBoton = () => {
    botonLogin.style.backgroundColor = login.value.length > 5 ? "var(--colorClaro)" : "var(--colorOscuro)"
    botonLogin.style.cursor = login.value.length > 5 ? "pointer" : "auto"
    botonLogin.style.pointerEvents = login.value.length > 5 ? "auto" : "none"
    botonLogin.querySelector(".icono").style.color = login.value.length > 5 ? "var(--colorOscuro)" : "var(--colorClaro)"
    estadoBoton = login.value.length > 5 ? true : false
}

const limpiarLogin = () => {login.value = ""}

const guardarDatos = () => {
    if (estadoBoton && usuario === "") {
        usuario = login.value
        login.placeholder = "Contraseña"
    } else if(estadoBoton) {
        password = login.value
        login.placeholder = "Verificando"
    }
    limpiarLogin()
    login.focus()
    if (usuario !== "" && password !== "") login.blur()
    console.log(usuario, password)
}

limpiarLogin()
login.addEventListener("input", cambiarEstadoBoton)
botonLogin.addEventListener("click", guardarDatos)
