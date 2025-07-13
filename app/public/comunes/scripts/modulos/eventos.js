/* se almacena en window.eventos */

export const crear = (array, elemento, accion, callback) => {
    elemento.addEventListener(accion, callback)
    array.push({elemento, accion, callback})
}   

export const eliminar = (array) => {
    array.forEach(item => {
        item.elemento.removeEventListener(item.accion, item.callback)
    })
    array.length = 0
}