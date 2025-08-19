import { vistaBase } from "../../clases/vistaBase.js"
import { crearElemento } from "../../modulos/crearElemento.js"
import { aleatorio } from "../../modulos/extra.js"

export class fondoBurbujas extends vistaBase {
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
        const burbujas = this.getAttribute("burbujas") ? Number(this.getAttribute("burbujas")) : 10
        const tempo = this.getAttribute("tempo") ? Number(this.getAttribute("tempo")) : 10
        const size = this.getAttribute("size") ? Number(this.getAttribute("size")) : 100
        const color = this.getAttribute("color") ? this.getAttribute("color") : "black"
        const enfasis = this.getAttribute("enfasis") ? this.getAttribute("enfasis") : "red"
        const difuminado = this.getAttribute("difuminado") ? Number(this.getAttribute("difuminado")) : 0
        const activo = this.getAttribute("activo") ? this.getAttribute("activo") : false
        this.configuracion = [burbujas, tempo, size, color, enfasis, difuminado, activo]
    }

    async dibujar() {
        const numBurbujas = this.configuracion[0]
        const size = this.configuracion[2]
        const color = this.configuracion[3]
        const enfasis = this.configuracion[4]
        const difuminado = this.configuracion[5]

        for (let i = 0; i <= numBurbujas; i++) {
            const resize = aleatorio(size / 2, size * 0.2)
            const burbuja = crearElemento(this.contenedor, "div", "burbuja")
            burbuja.style.width = `${resize}px`
            burbuja.style.backgroundColor = color
            burbuja.style.filter = `blur(${difuminado}px)`
            this.posicionar(burbuja)

            if (i % 4 === 0) burbuja.style.backgroundColor = enfasis
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

    static get observedAttributes() { return ["activo"] }

    async attributeChangedCallback(atributo, valor, nuevoValor) {
        console.log("componente visibilidad: " + nuevoValor)

        if (nuevoValor === "true") {
            const tempo = this.configuracion[1]

            for (const item of this.arrayElementos) {
                item.style.opacity = 1
                item.style.transition = `${aleatorio(tempo * 0.5, tempo * 2)}s ease-in-out`
                this.moverBurbujas(item)
                this.crearEvento(item, "transitionend", () => this.moverBurbujas(item))
            }
        } else if (this.arrayElementos) {
            for (const item of this.arrayElementos) {
                this.eliminarEventoSimple(item, "transitionend")
            }
        }
    }
}
customElements.define("fondo-burbujas", fondoBurbujas)