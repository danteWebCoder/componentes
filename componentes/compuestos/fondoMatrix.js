import { crearElemento } from "./../../funciones/dom/crearElemento.js"
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
        const cuadricula = crearElemento(this.contenedor, "cuadricula-ajustable", null, null, {"ratio": "30"}).shadowRoot
        const celdas = Array.from(cuadricula.querySelectorAll(".celda"))

        
    }
}
customElements.define("fondo-matrix", fondoMatrix)