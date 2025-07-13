/* se almacena en window.eventos */

export const evento = (array, elemento, accion, callback) => {
    if (!window[array]) window[array] = []
    elemento.addEventListener(accion, callback)
    window[array].push({elemento, accion, callback})
}   

export const eliminarEventos = () => {
    window.eventos.forEach(item => {
        item.elemento.removeEventListener(item.accion, item.callback)
    })
    window.eventos.length = 0
}