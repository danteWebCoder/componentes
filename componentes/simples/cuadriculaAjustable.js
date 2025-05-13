//dependencias
import { crearElemento } from "./../../funciones/dom/crearElemento.js"

class cuadridulaAjustable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow =({mode: "open"})


    }
    connectedCallback() {
        const algo = crearElemento(document, "div", "1 2 3", "id", {"uno": 1, "dos": 2})
        console.log(algo)
    }
}
customElements.define("cuadricula-ajustable", cuadridulaAjustable)
