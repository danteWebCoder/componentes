export const crearGridCuadricula = (contenedor, id, tamaño, elementoTipo = null) => {
    const elemento = elementoTipo ? elementoTipo : "div"
    const anchoContenedor = Math.floor(contenedor.offsetWidth)
    const altoContenedor = Math.floor(contenedor.offsetHeight)
    const columnas = Math.floor(anchoContenedor / tamaño)
    const filas = Math.floor(altoContenedor / tamaño)

    const nuevoGrid = document.createElement(elemento)
    nuevoGrid.style.display = "grid"
    nuevoGrid.setAttribute("id", id)
    nuevoGrid.style.gridTemplateColumns = `repeat(${columnas}, ${tamaño}px)`
    nuevoGrid.style.gridTemplateRows = `repeat(${filas}, ${tamaño}px)`

    for (let i = 0; i < columnas * filas; i++) {
        const nuevaCelda = document.createElement("div")
        nuevaCelda.classList.add("celda")
        nuevaCelda.setAttribute("hor", Math.floor(i % columnas)) // attr columna
        nuevaCelda.setAttribute("ver", Math.floor(i / columnas)) // attr fila
        nuevaCelda.id = "celda_" + i
        nuevoGrid.appendChild(nuevaCelda)
    }

    contenedor.appendChild(nuevoGrid)
    return nuevoGrid
}