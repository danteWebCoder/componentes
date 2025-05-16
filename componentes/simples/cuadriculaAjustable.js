//dependencias
import { crearElemento } from "./../../funciones/dom/crearElemento.js"

export class cuadridulaAjustable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        this.ratio = 150
        this.contenedor = crearElemento(this.shadowRoot, "div", "contenedor")
        const estilo = crearElemento(this.shadowRoot, "style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
            }

            :host {
                width: 100%;
                height: 100%;
            }

            .contenedor {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                height: 100%;
            
                .fila {
                    display: flex; 

                    .celda {
                        width: ${this.ratio}px;
                        height: ${this.ratio}px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .casilla {
                            width: 86%;
                            aspect-ratio: 1/1;
                            border: 1px solid rgba(50, 50, 50, .4);
                            border-radius: 4px;
                        }
                    }
                }
            }
        `
    }
    connectedCallback() {
        if (this.getAttribute("ratio")) this.ratio = Number(this.getAttribute("ratio"))

        const calcularMalla = () => {
            const ancho = this.contenedor.offsetWidth
            const alto = this.contenedor.offsetHeight
            const filas = Math.floor(alto / this.ratio) - 1
            const elementos = Math.floor(ancho / this.ratio) - 1
            return [filas, elementos]
        }

        const construirMalla = () => {
            const mallaCalculada = calcularMalla()
            const numFilas = mallaCalculada[0]
            const elementosEnFila = mallaCalculada[1]

            let contId = 0
            for (let y = 0; y <= numFilas; y++) {
                const fila = crearElemento(this.contenedor, "div", "fila")
                for (let x = 0; x <= elementosEnFila; x++) {
                    const celda = crearElemento(fila, "div", "celda")
                    celda.style.width = `${this.ratio}px`
                    celda.style.height = `${this.ratio}px`
                    const casilla = crearElemento(celda, "div", "casilla", "casilla_" + contId, {"hor": y, "ver": x })
                    contId += 1
                }
            }
        }
 
        construirMalla()
    }
}
customElements.define("cuadricula-ajustable", cuadridulaAjustable)
