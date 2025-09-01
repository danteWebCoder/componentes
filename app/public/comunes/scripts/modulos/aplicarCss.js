export const aplicarCss = (elemento, objeto) => {
    let estilo = []
    Object.entries(objeto).forEach(([clave, valor]) => {
        estilo += (clave + ": " + valor + "; ")
    })
    elemento.setAttribute("style", estilo)
}   