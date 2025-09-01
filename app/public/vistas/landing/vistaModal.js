import { vistaBase } from "../../comunes/scripts/clases/vistaBase.js"
import { mainControlForm } from "./scripts/formControl.js"
import { crearElemento } from "../../comunes/scripts/modulos/crearElemento.js"
import { fondoBurbujas } from "../../comunes/scripts/componentes/fondos/fondo_burbujas.js"

export class modal extends vistaBase {
    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
        this.importarCss(this.dom, "./app/public/vistas/landing/styles/modal.css")
        this.importarGF(this.dom, "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined")
        this.importarGF(this.dom, "https://fonts.googleapis.com/css2?family=Anta")
        this.importarGF(this.dom, "https://fonts.googleapis.com/css2?family=Walter+Turncoat")

        this.dom.innerHTML += `
        <div id="cajaContenido" class="cajaContenido centrado relativo borderGrisR8">
            <div id="cajaComponente" class="cajaComponente absoluto"></div>
            <form id="formLanding" class="max absoluto colCenEspaciado">
                <section class="cajaTipos colCenEspaciado relativo">
                    <span class="tipo relativo">Acceder con mis datos
                        <input class="inputOculto" type="radio" name="tipo" value="login" checked>
                    </span>
                    <span class="tipo relativo">Crear una cuenta nueva
                        <input class="inputOculto" type="radio" name="tipo" value="signUp">
                    </span>
                    <div id="cerrarModal" class="cerrar boton2 boton2Color centrado absoluto">X</div>
                </section>

                <section class="cajaInputs colCen">
                    <div class="campo centrado">
                        <div class="fondoInput absoluto"></div>
                        <div class="cajaInput rowCenV relativo">
                            <span class="iconoForm centrado material-symbols-outlined">person</span>
                            <input class="inputForm" id="usuarioForm" type="email" placeholder="Escribe tu mail">
                            <span class="iconoForm"></span>
                        </div>
                    </div>
                    <div class="campo centrado">
                        <div class="fondoInput absoluto"></div>
                        <div class="cajaInput rowCenV relativo">
                            <span class="iconoForm centrado material-symbols-outlined">lock</span>
                            <input class="inputForm" id="passForm" type="password" placeholder="Escribe tu contraseña">
                            <span class="iconoForm centrado material-symbols-outlined">visibility</span>
                        </div>
                    </div>

                    <div id="solicitarPass" class="solicitarPass borderGrisR4 boton2 centrado relativo">He olvidado la contraseña</div>

                    <div id="ultimoCampo" class="campo centrado repetirPass">
                        <div class="fondoInput absoluto"></div>
                        <div id="cajaInputRepPass" class="cajaInput rowCenV relativo">
                            <span class="iconoForm centrado material-symbols-outlined">lock</span>
                            <input class="inputForm" id="passRepForm" type="password" placeholder="Repite la contraseña">
                            <span class="iconoForm centrado material-symbols-outlined">visibility</span>
                        </div>
                    </div>    
                </section>

                <section class="cajaInferior">
                    <div class="cajaCondiciones horIzq">
                        <span class="check centrado material-symbols-outlined relativo borderGrisR4">
                            <span class="iconoCheck material-symbols-outlined absoluto">check</span>
                            <input id="condicionesCheck" class="inputOculto max relativo" type="checkbox">
                        </span>
                        <span class="condicionestexto">Acepto los<span class="condicionesLink"> terminos y condiciones </span>de uso</span>
                    </div>
                    <span id="botonReset" class="boton2 boton2Color centrado">Resetear</span>
                    <span id="botonEnvio" class="boton2 boton2Color centrado">Enviar</span>
                </section>
            </form>
        </div>
        `

        this.cajaComponente = this.dom.querySelector("#cajaComponente")
        this.componente = crearElemento(this.cajaComponente, "fondo-burbujas", null, null, {
            burbujas: 60,
            size: 200,
            tempo: 8,
            color: "rgba(80, 80, 80, 0.10)",
            enfasis: "rgba(0, 0, 0, 0.2)",
            fondo: "white",
            difuminado: 6,
            activo: false
        })
    } 

    connectedCallback() {

        const modal = this
        const cerrar = this.dom.getElementById("cerrarModal")

        cerrar.addEventListener("click", () => {
            modal.classList.add("modalOculto")
            modal.classList.remove("modalVisible")
            modal.setAttribute("visible", false)
        })

        mainControlForm(this.dom)
    }

    static get observedAttributes() {
        return ["visible"]
    }

    attributeChangedCallback(atributo, valor, nuevoValor) {
        nuevoValor === "true"
            ? this.componente.setAttribute("activo", true)
            : this.componente.setAttribute("activo", false)
    }

}
customElements.define("modal-login", modal)