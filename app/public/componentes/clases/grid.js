import {crearElemento} from "./../../modulos/crearElemento.js"

const grid =  (size) => {
    const elemento = document.getElementById("fondoGrid")
    elemento.style.display = "grid"
    elemento.style.gridTemplateRows =  `repeat(auto-fill, ${size}mm)`
    elemento.style.gridTemplateColumns = `repeat(auto-fill, ${size}mm)`

    const elementoMedicion = crearElemento(elemento, "div")
    elementoMedicion.style.width = `${size}mm`
    const px = elementoMedicion.offsetWidth
    elemento.removeChild(elementoMedicion)

    const numCol = Math.floor(elemento.offsetWidth / px)
    const numRow = Math.floor(elemento.offsetHeight / px)
    const numCeldas = numCol * numRow

    for (let i = 0; i < numCeldas; i++) {
        const celda = crearElemento(elemento, "div")
        celda.style.width = "100%"
        celda.style.height = "100%"
        celda.style.borderRight = "1px solid rgba(0, 0, 0, 0.1)"
        celda.style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)"
    }
}

const main = () => {
    grid(22)
}

main()