export const crearElemento = (objeto, elemento, clases = null, id = null, objectAttr = null) => {

    const creado = document.createElement(elemento)
    clases ? (() => { creado.className = clases })() : null
    id ? (() => { creado.id = id })() : null
    objectAttr ? Object.entries(objectAttr).forEach(([atributo, valor]) => { creado.setAttribute(atributo, valor) }) : null
    objeto.appendChild(creado)

    return creado
}