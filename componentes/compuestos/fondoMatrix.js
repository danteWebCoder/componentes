import { crearElemento } from "./../../funciones/dom/crearElemento.js"
import { numAleatorio } from "../../funciones/comunes/ramdom.js"
import { esperar } from "../../funciones/comunes/tiempos.js"
import { cuadridulaAjustable } from "./../simples/cuadriculaAjustable.js"

class fondoMatrix extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const estilo = crearElemento(this.shadowRoot, "style", "fondoMatrix")
        estilo.textContent = `
            :host {
                width: 100%;
                height: 100%;
            }

            .contenedor {
                width: 100%;
                height: 100%;
            }
        `

        this.contenedor = crearElemento(this.shadowRoot, "div", "contenedor", "contenedor")

    }

    connectedCallback() {
        const tempo = Number(this.getAttribute("tempo"))
        const velocidad = Number(this.getAttribute("velocidad"))

        let cuadricula
        const crearCuadricula = async () => {
            cuadricula = crearElemento(this.contenedor, "cuadricula-ajustable", null, null, {"ratio": "30"}).shadowRoot
            return cuadricula
        }

        let columnas = []
        const identificarColumnas = (cuadricula) => {
            const numColum = Array.from(cuadricula.querySelector(".fila").querySelectorAll(".casilla")).length
            for (let x = 0; x < numColum; x++) {
                columnas.push(x)
            }
            return columnas
        }
        
        let elementosColumna = {}
        const identificarElementos = (columnas) => {
            const casillas = Array.from(cuadricula.querySelectorAll(".casilla"))
            columnas.forEach((item, num) => {
                elementosColumna[num] = casillas.filter(casilla => Number(casilla.getAttribute("hor")) === item)
            })
            return elementosColumna
        }

        let columnasRandom = []
        const activarColumnas = async () => {
            while(true) {
                const numColumna = numAleatorio(0, columnas.length - 1)
                if (!columnasRandom.includes(numColumna)) {
                    columnasRandom.push(numColumna)
                    await esperar(1000)
                }
                // espera desarrollo
                if (columnasRandom.length > 6) await new Promise(resolver => setTimeout(resolver, 200000))
                console.log(columnasRandom)
            }
        }

        const actualizarCasillas = () => {

        }

        const main = async () => {
            await crearCuadricula()
            identificarColumnas(cuadricula)
            identificarElementos(columnas)
            activarColumnas()
            actualizarCasillas()
            console.log(elementosColumna)
        }

        main()
    }
}
customElements.define("fondo-matrix", fondoMatrix)