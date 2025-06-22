
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

const cambiarIdioma = (idioma) => {
    console.log(idioma)
}

const abrirForm = () => {
    console.log("modal")
    const modal = document.getElementById("modalForm")
    modal.classList.replace("modalMin", "modalMax")
}

const mainNav = () => {
    const opciones = Array.from(document.querySelectorAll(".opcionNav"))
    opciones.forEach(item => {
        item.addEventListener("click", () => {
            if (item.id !== "idiomas") cerrarIdiomas()
            if (item.id === "idiomas") abrirIdiomas()
            if (item.id === "login") abrirForm()
        })
    })

    const idiomas = Array.from(document.querySelectorAll(".idioma"))
    idiomas.forEach(item => {
        item.addEventListener("click", () => {
            cambiarIdioma(item.id)
        })
    })
}

mainNav()