import { crearElemento } from "../../modulos/crearElemento.js"
import { esperar } from "../../modulos/tiempos.js"
import { obtenerAtributos } from "../../modulos/extra.js"

export class capaTransicion extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div id="contenedor" class="contenedor"></div>`

        const estilo = crearElemento(this.dom, "style")
        estilo.textContent += `
            :host {
                display: flex;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 0;
                margin: 0;
            }

            .contenedor {
                --grosorBorde: 2px;
                --colorBorde: rgba(166, 255, 255, 1);
                position: absolute;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: calc(100% - var(--grosorBorde) * 2 + 1px);
                height: 0;
                background-color: rgba(0, 0, 0, 0.84);
                box-shadow: inset 0 0 3vw white;
                border: var(--grosorBorde) solid var(--colorBorde);
            }
        `
    }

    connectedCallback() {


        const animar = async (atributos) => {
            const tempo = atributos.tempo ? atributos.tempo.value : 10
            const espera = atributos.espera ? atributos.espera.value : 10
            const contenedor = this.dom.querySelector("#contenedor")

            contenedor.offsetHeight
            contenedor.style.transition = `${tempo}s ease-in-out`
            const grosorBorde = getComputedStyle(contenedor).getPropertyValue("--grosorBorde")
            contenedor.style.height = `calc(100% - ${grosorBorde} * 2 + 1px)`
        }

        const main = async () => {
            const attr = obtenerAtributos(this)
            animar(attr)
        }

        main()
    }
}

customElements.define("capa-transicion", capaTransicion)