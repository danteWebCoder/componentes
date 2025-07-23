import { aleatorio } from "./../../../comunes/scripts/modulos/extra.js"
import { esperar } from "./../../../comunes/scripts/modulos/tiempos.js"


export const animacionEngranajes = async (dom) => {
    const imgs = Array.from(dom.querySelectorAll(".imgAnimada"))

    let acum = Array(3).fill(0)
    const rotar = (num) => {
        const incremento = aleatorio(180, 360)
        const direccion = aleatorio(0, 1)
        direccion === 0
            ? acum[num] += incremento
            : acum[num] -= incremento

        imgs[num].style.transform = `rotate(${acum[num]}deg)`
    }

    let numAnt = 9
    let numAct
    await esperar(5000)
    while (true) {
        do {
            numAct = aleatorio(0, imgs.length - 1)
        } while (numAnt === numAct)

        numAnt = numAct
        rotar(numAct)
        await esperar(3000)
    }
}