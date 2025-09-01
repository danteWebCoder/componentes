export const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const obtenerAtributos = (elemento) => {
    return elemento.attributes
}