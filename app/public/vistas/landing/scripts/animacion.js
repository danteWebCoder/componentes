import { aleatorio } from "./../../../comunes/scripts/modulos/extra.js"
import { esperar } from "./../../../comunes/scripts/modulos/tiempos.js"

export const animacionEngranajes = async () => {
    let acum = Array(3).fill(0)
    const rotar = (item, num) => {
        const incremento = aleatorio(180, 360)
        const direccion = aleatorio(0, 1)
        direccion === 0
            ? acum[num - 1] += incremento
            : acum[num - 1] -= incremento

        item.style.transform = `rotate(${acum[num - 1]}deg)`
    }

    let numAnt = 9
    let numAct
    await esperar(5000)
    while (true) {
        do {
            numAct = aleatorio(1, 3)
        } while (numAnt === numAct)

        numAnt = numAct
        rotar(document.getElementById(`img${numAct}`), numAct)
        await esperar(3000)
    }
}