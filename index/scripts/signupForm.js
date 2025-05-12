const formulario = document.getElementById("signupForm")
const signUp = document.getElementById("signUp")
const inputs = Array.from(document.getElementById("signupForm").querySelectorAll("input"))
const iconos = Array.from(document.getElementById("signupForm").querySelectorAll(".iconoChecked"))
const aceptar = document.getElementById("aceptar")
const cerrar = document.getElementById("cerrar")
const iconoFondo = document.getElementById("iconoFondoForm")
const iconosVisibilidad = Array.from(document.querySelectorAll(".visibilidadIcono"))

const validarInputs = (() => {
    let estado = true
    inputs.forEach((input, num) => {

        if (input.name === "user" || input.name === "pass") {
            if (input.value.length < 6) {
                estado = false
                iconos[num].style.color = "transparent"
            } else {
                iconos[num].style.color = "var(--colorCyanApagado)"
            }
        }

        if (input.name === "repeatPass") {
            console.log(inputs[2].value)
            if (input.value.length >= 6 && input.value === inputs[1].value) {
                iconos[num].style.color = "var(--colorCyanApagado)"
                iconos[num].textContent = "verified_user"
            } 
            else if (input.value.length >= 6 && input.value !== inputs[1].value) {
                iconos[num].style.color = "rgb(230, 89, 89)" 
                iconos[num].textContent = "gpp_bad"
                estado = false
            } else {
                estado = false
                iconos[num].style.color = "transparent"
            }
        }

        if (input.name === "legal" && input.checked === false) {
            estado = false
        }
           
        aceptar.disabled = estado ? false : true
        iconoFondo.textContent = estado ? "sentiment_satisfied" : "sentiment_dissatisfied"
    })
})

const resetForm = () => {
    inputs.forEach((item, num) => {
        item.value = ""
        item.type === "checkbox" ? item.checked = false : null
    })
    iconos.forEach((item) => {
        item.style.color = "transparent"
    })
    iconoFondo.textContent = "sentiment_dissatisfied"
}

const formularioSignUp = () => {
    if (!visivilidadForm) {
        formulario.className = "signupForm centrado"
        resetForm()
        visivilidadForm = true
    } else {
        formulario.className = "oculto"
        visivilidadForm = false
    }
}

const passTexto = (indice) => {
    const icono = iconosVisibilidad[indice]
    if (icono.textContent === "visibility") {
        icono.textContent = "visibility_off"
        inputs[indice + 1].type = "password"
    } else {
        icono.textContent = "visibility"
        inputs[indice + 1].type = "text"
    }
    requestAnimationFrame(() => { // parche por la desincronizacion del render del navegador
        inputs[indice + 1].blur() 
    })
}

validarInputs()

let visivilidadForm = false
signUp.addEventListener("click", () => {
    formularioSignUp()
})

cerrar.addEventListener("click", () => {
    signUp.checked = false
    formularioSignUp()
})

inputs.forEach((input) => {
    input.addEventListener("input", () => {
        validarInputs()
    })
})

iconosVisibilidad.forEach((item, num) => {
    item.addEventListener("click", () => {
        passTexto(num)
    })
})  
