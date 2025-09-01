export const publicar = (dom, nombreEvento, datos, burbujeo = null, restringido = null) => {
    const evento = new CustomEvent(nombreEvento, {
        detail: datos,
        bubbles: burbujeo,
        composed: restringido
    })
    dom.dispatchEvent(evento)
}

export const recibir = (dom, nombreEvento, callback) => {
    dom.addEventListener(nombreEvento, (e) => {
        callback(e.detail)
    })
}