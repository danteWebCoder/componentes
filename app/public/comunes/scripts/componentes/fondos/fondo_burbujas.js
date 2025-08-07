import { crearElemento } from "../../modulos/crearElemento.js"
import { aleatorio } from "../../modulos/extra.js"

export class fondoBurbujas extends HTMLElement {
    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })

        const estilo = crearElemento(this.dom, "style")
        estilo.textContent = `
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }

        .contenedor {
            position: relative;
            width: 100%;
            height: 100%; 
            overflow: hidden;
            
            .burbuja {
                position: absolute;
                aspect-ratio: 1/1;
                border-radius: 50%;
                opacity: 0;
            }
        }
        `

        this.dom.innerHTML += `<div id="contenedor" class="contenedor"></div>`

        this.capaFiltro = this.dom.querySelector("#capaFiltro")
        this.contenedor = this.dom.querySelector("#contenedor")
        this.contenedorSizeX
        this.contenedorSizeY
        this.configuracion
        this.arrayElementos

        window.addEventListener("load", async () => {
            this.contenedorSizeX = this.contenedor.offsetWidth
            this.contenedorSizeY = this.contenedor.offsetHeight
            this.arrayElementos = await this.preparar()
        })
    }

    leerConfig() {
        const burbujas = this.getAttribute("burbujas") ? Number(this.getAttribute("burbujas")) : null
        const tempo = this.getAttribute("tempo") ? Number(this.getAttribute("tempo")) : null
        const size = this.getAttribute("size") ? Number(this.getAttribute("size")) : null
        const color = this.getAttribute("color") ? this.getAttribute("color") : null
        const difuminado = this.getAttribute("difuminado") ? Number(this.getAttribute("difuminado")) : null
        this.configuracion = [burbujas, tempo, size, color, difuminado]
    }

    async dibujar() {
        const numBurbujas = this.configuracion[0]
        const size = this.configuracion[2]
        const color = this.configuracion[3]
        const difuminado = this.configuracion[4]

        for (let i = 0; i <= numBurbujas; i++) {
            const resize = aleatorio(size / 1.5, size)
            const burbuja = crearElemento(this.contenedor, "div", "burbuja")
            burbuja.style.width = `${resize}px`
            burbuja.style.backgroundColor = color
            burbuja.style.filter = `blur(${difuminado}px)`
            this.posicionar(burbuja)
        }

        return this.contenedor.querySelectorAll(".burbuja")
    }

    posicionar(item) {
        const posicionX = aleatorio(0, this.contenedorSizeX - item.offsetWidth)
        const posicionY = aleatorio(0, this.contenedorSizeY - item.offsetWidth)
        item.style.top = `${posicionY}px`
        item.style.left = `${posicionX}px`
    }

    moverBurbujas(item) {
        let moverX, moverY
        const itemSize = item.offsetHeight
        moverX = aleatorio(0, this.contenedorSizeX - item.offsetWidth)
        moverY = aleatorio(0, this.contenedorSizeY - item.offsetWidth)

        item.style.top = `${moverY}px`
        item.style.left = `${moverX}px`
    }


    async preparar() {
        const configuracion = this.leerConfig()
        return await this.dibujar(configuracion)
    }

    static get observedAttributes() { return ["visible"] }

    async attributeChangedCallback(atributo, valor, nuevoValor) {
        console.log("componente visibilidad: " + nuevoValor)
        const tempo = this.configuracion[1]

        for (const item of this.arrayElementos) {
            item.style.opacity = 1
            item.style.transition = `${aleatorio(tempo * 0.5, tempo * 2)}s ease-in-out`
            this.moverBurbujas(item)
/*             await esperar(100)
 */            item.addEventListener("transitionend", () => this.moverBurbujas(item))
        }
    }
}
customElements.define("fondo-burbujas", fondoBurbujas)