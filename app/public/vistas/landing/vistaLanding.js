import { vistaBase } from "../../comunes/scripts/clases/vistaBase.js"
import { animacionEngranajes } from "./scripts/animacion.js"
import { controlNav } from "./scripts/nav.js"
import { modal } from "./vistaModal.js"

export class vistaLanding extends vistaBase {
    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
        this.importarCss(this.dom, "./app/public/vistas/landing/styles/index.css")
        this.importarGF(this.dom, "https://fonts.googleapis.com/css2?family=Anta")
        
        this.dom.innerHTML += `
        <header class="header">
            <div id="saltar" class="saltar centrado relativo borderGrisR4">Saltar Login</div>
            <nav class="absoluto horCenEspaciado">
                <span id="botonLogin" class="login opcionNav centrado">Login</span>
                <span id="proyectos" class="opcionNav centrado">Proyectos</span>
                <span id="idiomas" class="opcionNav centrado relativo idiomas">Idioma
                    <ul id="cajaIdiomas" class="cajaIdiomas absoluto horCenEspaciado">
                        <li class="idioma centrado relativo">Español
                            <input id="es" type="radio" name="opc-idioma" class="inputOculto" checked>
                        </li>
                        <li class="idioma centrado relativo">Ingles
                            <input id="en" type="radio" name="opc-idioma" class="inputOculto">
                        </li>
                        <li class="idioma centrado relativo">Euskera
                            <input id="eu" type="radio" name="opc-idioma" class="inputOculto">
                        </li>
                    </ul>
                </span>
                <span id="personal" class="opcionNav centrado relativo">Sobre mi</span>
            </nav>
        </header>

        <div class="cajaBienvenida">
            <section class="titulo colCenAround centrado">
                <h1 class="auto" data-idioma="titulo">
                    PROYECTO COMPONENTES AVANZADOS
                </h1>
                <q class="texto auto" data-idioma="cita">La felicidad de tu vida depende de la calidad de tus
                    pensamientos...</q>
                <span data-idioma="autor">Marco Aurelio</span>
            </section>

            <section class="descripcion colIzqAround">
                <p data-idioma="descripcion1">Este es un proyecto personal basado tanto en componentes web como en
                    componentes de interfaz.</p>
                <p data-idioma="descripcion2">Su objetivo principal es servir como repositorio visual y demo de mi propio
                    trabajo. Se han incoltido horas en
                    su desarrollo de las cuales una gran parte han sido incoltidas en investigacion, auto formación y
                    desarrollo de la interfaz.</p>
            </section>

            <section class="cajaComenzar">
                <span id="botonComenzar" class="boton1 centrado">Comenzar</span>
            </section>

            <section class="hardware">
                <img class="pantallas" src="app/public/recursos/imagenes/landing_responsive.png" alt="imagenes pantallas">
                <div class="capa1 capa fondoPantallas simbolos_CC centrado">
                    <span class="imgAnimada max"></span>
                </div>
                <div class="capa2 capa fondoPantallas simbolos_CC centrado">
                    <span class="imgAnimada max"></span>
                </div>
                <div class="capa3 capa fondoPantallas simbolos_CC centrado">
                    <span class="imgAnimada max"></span>
                </div>
            </section>

        </div>

        <footer class="centrado">
            <div class="cajaFlexCentrada">
                <div id="logo_CC" class="logo_CC"></div>
            </div>
        </footer>

        <modal-login id="modal" class="modal modalOculto absoluto max centrado"></modal-login>
        `
    }
    connectedCallback() {
        animacionEngranajes(this.dom)
        controlNav(this.dom)

        const modal = this.dom.getElementById("modal")
        const botonLogin = this.dom.getElementById("botonLogin")
        const botonComenzar = this.dom.getElementById("botonComenzar")

        const mostrarModal = () => {
            modal.classList.remove("modalOculto")
            modal.focus()
            modal.classList.add("modalVisible")
            modal.setAttribute("visible", true)
        }

            ;[botonLogin, botonComenzar].forEach(item => {
                this.crearEvento(item, "click", () => { mostrarModal() })
            })
    }

}
customElements.define("vista-landing", vistaLanding)