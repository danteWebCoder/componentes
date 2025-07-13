export const esperar = async (tiempo) => {
    await new Promise(resolver => setTimeout(resolver, tiempo))
}

export const retrasar = (tiempo, callback) => {
    setTimeout(() => {
        callback()
    }, tiempo);
}