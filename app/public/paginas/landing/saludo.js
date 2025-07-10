import { esperar } from "./../../modulos/tiempos.js"
import { crearElemento } from "./../../modulos/crearElemento.js"

const cerrarForm = async (item) => {
    form.style.transition = "0.5s"
    form.style.opacity = 0

    const botonCerrar = document.getElementById("cerrar")
    botonCerrar.style.opacity = 0
    botonCerrar.style.transition = "0.5s"

    await esperar(500)
    form.style.display = "none"
    botonCerrar.style.display = "none"
}

const mostrarCaja = async (item) => {
    item.style.display = "flex"
    void item.offsetHeight
    item.style.opacity = 1
}

const saludar = (usuario) => {
    usuarioSaludo.textContent = usuario
    const saludo = crearElemento(usuarioSaludo, "span", "saludo absoluto")
    saludo.textContent = "Bienvenido"
}

const dibujarIndicador = (item) => {
    const ancho = 8
    const cajaIndicador = crearElemento(item, "div", "cajaIndicador relativo centrado")
    const numElementos = Math.floor(cajaIndicador.offsetWidth / ancho)
    const indicador = crearElemento(cajaIndicador, "ul", "indicador horCenEspaciado")
    for (let i = 0; i < numElementos * 0.6; i++) {
        const marca = crearElemento(indicador, "li", "marca relativo")
        marca.style.width = `${ancho}px`
        marca.style.height = `${ancho}px`
    }
    const marcas = Array.from(document.querySelectorAll(".marca"))
    marcas[0].style.width = `${ancho * 2}px`
    marcas[0].style.height = `${ancho * 2}px`
    marcas[marcas.length - 1].style.width = `${ancho * 2}px`
    marcas[marcas.length - 1].style.height = `${ancho * 2}px`

    return Array.from(document.getElementsByClassName("marca"))
}

const animacion = async (array) => {
    console.log(array.length)
    array.forEach((item, num) => {
        item.style.animationDelay = `${num * 0.1}s`
    })
}

export const iniciarLogin = async (usuario, form) => {
    const cajaFondo = document.getElementById("cajaFondo")
    const cajaSaludo = document.getElementById("cajaSaludo")
    const usuarioSaludo = document.getElementById("usuarioSaludo")

    await cerrarForm(form)
    await esperar(500)
    await mostrarCaja(cajaFondo)
    const anchoSaludo = saludar(usuario, usuarioSaludo)
    const elementosAnimacion = dibujarIndicador(cajaSaludo, anchoSaludo)
    animacion(elementosAnimacion)
    elementosAnimacion[0].addEventListener("animationiteration", () => {
        const entrarApp = document.getElementById("entrarApp")
        entrarApp.classList.add("activado")
    })

}
