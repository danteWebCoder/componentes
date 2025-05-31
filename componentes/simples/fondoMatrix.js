import { crearElemento } from "../../funciones/dom/crearElemento.js"
import { crearGridCuadricula } from "../../funciones/dom/crearGrid.js"
import { numAleatorio } from "../../funciones/comunes/ramdom.js"
import { esperar, retrasar } from "../../funciones/comunes/tiempos.js"

class fondoMatrix extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })

        this.contenedor = crearElemento(this.shadowRoot, "div", "contenedor", "contenedor")
        const estilo = crearElemento(this.shadowRoot, "style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
            }

            :host {
                width: 100%;
                height: 100%;
            }

            .contenedor {
                display: flex;
                justify-content: center; 
                align-items: center;
                width: 100%;
                height: 100%;
                overflow: hidden;

                .celda {
                    width: 100%;
                    height: 100%;
                    font-size: 16px;

                    &:hover .subCelda {
                        text-shadow: 0 0 8px orange, 0 0 8px orange, 0 0 4px orange, 0 0 14px orange;
                        transform: scale(400%);
                    }

                    &:not(:hover) .subCelda {
                        text-shadow: 0 0 8px cyan, 0 0 8px cyan, 0 0 4px cyan, 0 0 14px cyan;
                        transform: scale(100%);
                        transition: transform 2s ease-out, text-shadow 2s; 
                    }

                    .hoverSimulado {
                        text-shadow: 0 0 8px orange, 0 0 8px orange, 0 0 4px orange, 0 0 14px orange !important;
                        transform: scale(400%) !important;
                        transition: .1s ease-in-out !important;
                    }

                    .subCelda {
                        position: relative;
                        left: 0;
                        rigth: 0;
                        top: 0;
                        z-index: -1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        color: white;
                    }

                    .charInsertado {
                        --color: rgb(206, 201, 131);
                        text-shadow: 0 0 8px var(--color), 0 0 8px var(--color), 0 0 4px var(--color), 0 0 14px var(--color) !important;
                        font-size: 24px;
                        filter: blur(4px);
                        transition: 0s !important;
                    }

                    .charDesvanecer {
                        transform: scale(60%) !important;
                        opacity: 0;
                        transition: .6s ease-in-out !important;
                    }
                }
             }
        `
    }

    connectedCallback() {
        const velocidad = Number(this.getAttribute("velocidad"))
        const volumen = Number(this.getAttribute("volumen"))
        const tempoColumnas = Number(this.getAttribute("tempoColumnas"))
        const columnasMax = Number(this.getAttribute("columnasMax"))

        let cuadricula
        const crearCuadricula = async () => {
            cuadricula = crearGridCuadricula(this.contenedor, "gridMatrix", volumen)
        }

        let infoCuadricula = []
        const analizarCuadricula = async () => {
            const celdas = Array.from(cuadricula.querySelectorAll(".celda"))
            const indexColumnas = celdas.filter(item => Number(item.getAttribute("ver")) === 0).map((item, i) => i)
            const indexFilas = celdas.filter(item => Number(item.getAttribute("hor")) === 0).map((item, i) => i).length - 1
            infoCuadricula = [celdas, indexColumnas, indexFilas]
        }

        let subCeldas = []
        const crearSubCeldas = async () => {
            const celdas = infoCuadricula[0]

            celdas.forEach((item) => {
                const subCelda = crearElemento(item, "div", "subCelda")
                subCelda.setAttribute("hor", item.getAttribute("hor"))
                subCelda.setAttribute("ver", item.getAttribute("ver"))
                subCeldas.push(subCelda)
            })
        }

        let elementosColumna = []
        const reconocerElementosColumna = () => {
            const numColumnas = infoCuadricula[1]

            numColumnas.forEach((item) => {
                const elementosVerticales = Array.from(subCeldas.filter(celda => Number(celda.getAttribute("hor")) === item))
                elementosColumna.push(elementosVerticales)
            })
        }

        let columnasAleatorias = []
        const aleatorizarColumnas = async () => {
            while (true) {
                const numeroMax = infoCuadricula[1].length - 1
                if (columnasAleatorias.length <= columnasMax) {
                    const columnaAleatoria = numAleatorio(0, numeroMax)
                    if (!columnasAleatorias.includes(columnaAleatoria)) columnasAleatorias.push(columnaAleatoria)
                }
                await esperar(tempoColumnas)
            }
        }

        let contadorVertical = []
        const generarContadorVertical = () => {
            const numEstados = infoCuadricula[1]
            contadorVertical = numEstados.map(item => 0)
        }

        const limpiar = async (item) => {
            elementosColumna[item].forEach((celda) => {
                celda.textContent = ""
                celda.classList.remove("charDesvanecer", "hoverSimulado")
            })

            columnasAleatorias.splice(columnasAleatorias.findIndex(elemento => elemento === item), 1)
            contadorVertical[item] = -1 // compensando el ultimo incremento del contador despues de limpiar
        }

        const caracteresMatrix = [
            'ᚠ', 'ᚡ', 'ᚢ', 'ᚣ', 'ᚤ', 'ᚥ', 'ᚬ', 'ᚭ', 'ᚮ', 'ᚯ', 'ᚰ', 'ᚱ', 'ᚳ', 'ꠡ',
            'ᚴ', 'ᚵ', 'ᚶ', 'ᚸ', 'ᚺ', 'ᚻ', 'ᚼ', 'ᚽ', 'ᚾ', 'ᚿ', 'ᛀ', 'ᛂ', 'ᛅ', 'ᛆ', 'ᛇ', 'Ⱁ', 'ꠢ', 'ꠣ',
            'ᛈ', 'ᛉ', 'ᛊ', 'ᛋ', 'ᛐ', 'ᛑ', 'ᛒ', 'ᛓ', 'ᛔ', 'ᛗ', 'ᛘ', 'ᛙ', 'ᛚ', 'ᛛ', 'ʖ', 'ʞ', 'ᛝ', 'ᛞ',
            'ᛟ', 'Ⰰ', 'Ⰱ', 'Ⰲ', 'Ⰳ', 'Ⰵ', 'Ⰷ', 'Ⰸ', 'Ⰹ', 'Ⰺ', 'Ⰻ', 'Ⰼ', 'Ⰽ', 'Ⰾ',
            'Ⱄ', 'Ⱅ', 'Ⱆ', 'Ⱇ', 'Ⱈ', 'Ⱉ', 'Ⱊ', 'Ⱋ', 'Ⱌ', 'Ⱍ', 'Ⱎ', 'Ⱏ', 'Ⱐ', 'Ⱑ', 'Ⱒ', 'Ⱓ', 'Ⱔ', 'Ⱀ',
            'Ⱖ', 'Ⱚ', 'Ⱛ', 'Ⱞ', 'Ⱟ', 'ꠁ', 'ꠃ', 'ꠄ', 'ꠅ', 'ꠇ', 'ꠈ', 'ꠉ', 'ꠊ', 'ꠌ', 'ꠍ',
            'ꠎ', 'ꠏ', 'ꠐ', 'ꠑ', 'ꠒ', 'ꠓ', 'ꠔ', 'ꠕ', 'ꠖ', 'ꠗ', 'ꠘ', 'ꠙ', 'ꠚ', 'ꠛ', 'ꠜ', 'ꠝ', 'ꠞ', 'ꠟ', 'ꠠ'
        ]

        const efectoMatrix = async () => {
            const numFilas = infoCuadricula[2]
            const factorColumna = 2

            while (true) {
                if (columnasAleatorias.length === 0) aleatorizarColumnas()

                for (const columna of columnasAleatorias) {
                    const celdasColumna = elementosColumna[columna]
                    const contador = contadorVertical[columna]
                    const celda = celdasColumna[contador]
                    const celdaAnterior = celdasColumna[contador - 1]
                    const celdaFinColumna = celdasColumna[celdasColumna.length - 1]
                    const celdaDesvanecer = celdasColumna[contador - numFilas * factorColumna - 1]
                    const celdaAleatoria = celdasColumna[numAleatorio(2, numFilas - 2)]

                    if (contador <= numFilas) {
                        if (celdaAnterior) celdaAnterior.classList.remove("charInsertado")
                        const caracter = caracteresMatrix[numAleatorio(0, caracteresMatrix.length - 1)]
                        celda.classList.add("charInsertado")
                        celda.textContent = caracter

                        if (celda === celdaAleatoria
                            && celda !== celdasColumna[contador - 1]  // celdas anteriores
                            && celda !== celdasColumna[contador - 2]
                            && celda !== celdasColumna[contador - 3]
                            && celda !== celdasColumna[contador - 4])
                            celdaAleatoria.classList.add("hoverSimulado")

                        retrasar(velocidad * 20, () => celdaAleatoria.classList.remove("hoverSimulado"))

                    } else {
                        if (celdaFinColumna.classList.contains("charInsertado")) celdaFinColumna.classList.remove("charInsertado")
                        if (contador > numFilas * factorColumna) if (celdaDesvanecer) celdaDesvanecer.classList.add("charDesvanecer")
                        if (contador > numFilas * factorColumna + numFilas * 2) await limpiar(columna)
                    }
                    contadorVertical[columna] += 1
                }
                await esperar(velocidad)
            }
        }

        const main = async () => {
            await crearCuadricula()
            await analizarCuadricula()
            await crearSubCeldas()
            await reconocerElementosColumna()
            generarContadorVertical()
            efectoMatrix()
        }

        main()
    }
}
customElements.define("fondo-matrix", fondoMatrix)
// columnas aleatorias no cercanas
// celdasAleatorias en efecto no dinamicas