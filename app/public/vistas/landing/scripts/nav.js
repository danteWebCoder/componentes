const abrirIdiomas = (dom) => {
    const caja = dom.getElementById("cajaIdiomas")
    caja.style.display = getComputedStyle(caja).display === "none"
        ? "flex"
        : "none"
    caja.classList.toggle("seleccionada")
}

const cerrarIdiomas = (dom) => {
    const opcIdiomas = dom.getElementById("idiomas")
    const caja = dom.getElementById("cajaIdiomas")
    const valorDisplay = getComputedStyle(caja).display
    if (valorDisplay) {
        caja.style.display = "none"
        caja.classList.remove("seleccionada")
    }
}

export const controlNav = (dom) => {
    const opciones = Array.from(dom.querySelectorAll(".opcionNav"))
    opciones.forEach(item => {
        item.addEventListener("click", () => {
            if (item.id !== "idiomas") cerrarIdiomas(dom)
            if (item.id === "idiomas") abrirIdiomas(dom)
        })
    })

    const idiomas = Array.from(dom.querySelectorAll("#cajaIdiomas .inputOculto"))
    idiomas.forEach(item => {
        item.addEventListener("click", () => {
            console.log(idiomas.find(item => item.checked).id)
        })
    })
}