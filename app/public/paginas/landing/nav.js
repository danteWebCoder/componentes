import {traducir} from "./../../modulos/traducir.js"

const abrirIdiomas = () => {
    const caja = document.getElementById("cajaIdiomas")
    caja.style.display = getComputedStyle(caja).display === "none"
        ? "flex"
        : "none"
    idiomas.classList.toggle("seleccionada")
}

const cerrarIdiomas = () => {
    const opcIdiomas = document.getElementById("idiomas")
    const caja = document.getElementById("cajaIdiomas")
    const valorDisplay = getComputedStyle(caja).display
    if (valorDisplay) {
        caja.style.display = "none"
        idiomas.classList.toggle("seleccionada")
    }
}

const mainNav = () => {
    const opciones = Array.from(document.querySelectorAll(".opcionNav"))
    opciones.forEach(item => {
        item.addEventListener("click", () => {
            if (item.id !== "idiomas") cerrarIdiomas()
            if (item.id === "idiomas") abrirIdiomas()
        })
    })

    const idiomas = Array.from(document.querySelectorAll("#cajaIdiomas .inputOculto"))
    idiomas.forEach(item => {
        item.addEventListener("click", () => {
            console.log(idiomas.find(item => item.checked).id)
        })
    })
}

mainNav()