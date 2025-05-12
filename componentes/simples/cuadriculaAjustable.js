class cuadridulaAjustable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow =({mode: "open"})

        
    }
}
customElements.define(cuadridulaAjustable, "cuadricula-ajustable")
