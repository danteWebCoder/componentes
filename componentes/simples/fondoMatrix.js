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
                        transform: scale(340%);
                    }

                    &:not(:hover) .subCelda {
                        text-shadow: 0 0 8px cyan, 0 0 8px cyan, 0 0 4px cyan, 0 0 14px cyan;
                        transform: scale(100%);
                        transition: transform 2s ease-out, text-shadow 2s; 
                    }

                    .hoverSimulado {
                        text-shadow: 0 0 8px orange, 0 0 8px orange, 0 0 4px orange, 0 0 14px orange !important;
                        transform: scale(340%) !important;
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
                        transition: 1.2s ease-in-out !important;
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
            'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ',
            'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ',
            'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ',
            'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', 'ヮ', 'ヿ', 'ゔ', 'ゕ', 'ゖ',

            // Runas anglosajonas (Futhorc)
            'ᚠ', 'ᚡ', 'ᚢ', 'ᚣ', 'ᚤ', 'ᚥ', 'ᚦ', 'ᚧ', 'ᚨ', 'ᚩ', 'ᚪ', 'ᚫ', 'ᚬ', 'ᚭ', 'ᚮ', 'ᚯ',

            // Glagolítico
            'Ⰰ', 'Ⰱ', 'Ⰲ', 'Ⰳ', 'Ⰴ', 'Ⰵ', 'Ⰷ', 'Ⰸ', 'Ⰹ', 'Ⰼ', 'Ⰽ',

            // Fuþark joven (runas modernas)
            'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ', 'ᛝ', 'ᚱ', 'ᛃ', 'ᚻ', 'ᚾ',

            // Tifinagh
            'ⴱ', 'ⴳ', 'ⴷ', 'ⴻ', 'ⵔ', 'ⵏ', 'ⵓ', 'ⵡ', 'ⵉ', 'ⵎ', 'ⵅ', 'ⵄ', 'ⵇ',

            // Deseret
            '𐐀', '𐐁', '𐐂', '𐐅', '𐐆', '𐐇', '𐐈', '𐐉', '𐐊', '𐐋', '𐐌', '𐐍',

        ];

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
                            // celdas de separacion
                            && !celdasColumna[contador - 1].classList.contains("hoverSimulado")
                            && !celdasColumna[contador - 2].classList.contains("hoverSimulado"))
                            celdaAleatoria.classList.add("hoverSimulado")

                        retrasar(velocidad * 30, () => celdaAleatoria.classList.remove("hoverSimulado"))

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