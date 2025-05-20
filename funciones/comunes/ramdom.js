export const numAleatorio = ((min = null, max = null) => {
    const minimo = min ? min : 0
    const maximo = max ? max : 1
    return Math.floor(Math.random() * (max - min + 1) + min)
})