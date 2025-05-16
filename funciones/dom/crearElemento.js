export const crearElemento = (objeto, elemento, clases = null, id = null, objectAttr = null) => {
    if (!objeto && !elemento && !clases) {
        console.log("faltan parametros en la funcion crearElemento")
        return
    }
    const nuevoElemento = document.createElement(elemento)
    clases ? (() => { nuevoElemento.className = clases })() : null
    id ? (() => { nuevoElemento.id = id })() : null
    if (objectAttr) {
        Object.entries(objectAttr).forEach(([atributo, valor]) => {
            nuevoElemento.setAttribute(atributo, valor)
        })
    }
    objeto.appendChild(nuevoElemento)
    return nuevoElemento
}