const contenedor = document.getElementsByClassName("fondoBinario")[0] // ojo solo para un elemento
const shadowRoot = contenedor.attachShadow({ mode: "open" })
const pxCelda = 30
const opacidad = 10
const color = "grey"

shadowRoot.innerHTML = `<div id="caja" class="caja"></div>`

const estilo = document.createElement("style")
estilo.textContent = `
    .centrado {display: flex; justify-content: center; align-items: center;}
    .desactivada {transform: translateZ(0); color: white; opacity: ${opacidad}%; transition: .5s;}
    .activada {transform: translateZ(120px) scale(200%); color: greenYellow; opacity: 100%;  transition: .5s;}

    :host {width: 100%; height: 100%; border: 1px solid blue; perspective: 2000px;}
    .caja {width: 100%; height: 80%; transform: rotateY(40deg); transform-origin: left; transform-style: preserve-3d;} 
    .celda {width: 100%; height: 100%; perspective: 11200px; font-weight: bolder; font-size: 12px;}
`
shadowRoot.appendChild(estilo)

const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cuadricula = async () => {
    const caja = shadowRoot.querySelector("#caja")
    const celdasRow = Math.round(caja.offsetHeight / pxCelda)
    const celdasCol = Math.round(caja.offsetWidth / pxCelda)
    const numCeldas = celdasCol * celdasRow

    caja.style.display = "grid"
    caja.style.gridTemplateColumns = `repeat(${celdasCol}, 1fr)`
    caja.style.gridTemplateRows = `repeat(${celdasRow}, 1fr)`

    for (let i = 0; i < numCeldas; i++) {
        const celda = document.createElement("div")
        celda.className = "celda centrado desactivada"
        celda.textContent = aleatorio(0, 1)
        caja.appendChild(celda)
    }

    return Array.from(caja.querySelectorAll(".celda"))
}

const activar = async (array) => {
    let celdaAnterior
    while (true) {
        const celdaActual = array[aleatorio(0, array.length - 1)]

        if (celdaAnterior) {
            celdaAnterior.classList.replace( "activada", "desactivada")
        }
        celdaActual.classList.replace("desactivada", "activada")
        celdaAnterior = celdaActual

        await new Promise(resolver => setTimeout(resolver, 1000))
    }
}

const main = async () => {
    const celdas = await cuadricula()
    activar(celdas)
}

main()