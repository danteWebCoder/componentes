import { vistaBase } from "../../comunes/scripts/clases/vistaBase.js"
import { mainControlForm } from "./scripts/formControl.js"

export class modal extends vistaBase {
    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
        this.importarCss(this.dom, "./app/public/vistas/landing/styles/modal.css")
        this.importarGF(this.dom, "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined")
        this.importarGF(this.dom, "https://fonts.googleapis.com/css2?family=Anta")

        this.dom.innerHTML += `
        <div class="cajaContenido borderGrisR8">
            <form id="formLanding" class="max colCenEspaciado">
                <section class="cajaTipos colCenEspaciado relativo">
                    <span class="tipo relativo">Acceder con mis datos
                        <input class="inputOculto" type="radio" name="tipo" value="login" checked>
                    </span>
                    <span class="tipo relativo">Crear una cuenta nueva
                        <input class="inputOculto" type="radio" name="tipo" value="signUp">
                    </span>
                    <div id="cerrarModal" class="cerrar centrado absoluto">
                        <span class="icono material-symbols-outlined">close</span>
                    </div>
                </section>

                <section class="cajaInputs colCen">
                    <div class="campo centrado">
                        <div class="cajaInput rowCenV">
                            <span class="iconoForm centrado material-symbols-outlined">person</span>
                            <input class="inputForm transparente" id="usuarioForm" type="email" placeholder="Escribe tu mail">
                        </div>
                    </div>
                    <div class="campo centrado">
                        <div class="cajaInput rowCenV">
                            <span class="iconoForm centrado material-symbols-outlined">lock</span>
                            <input class="inputForm" id="passForm" type="password" placeholder="Escribe tu contraseña">
                            <span class="iconoForm centrado material-symbols-outlined">visibility</span>
                        </div>
                    </div>
                    <div class="campo centrado">
                        <div id="cajaInputRepPass" class="cajaInput rowCenV">
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
                    <span id="botonReset" class="boton2 boton2Des centrado">Borrar</span>
                    <span id="botonEnvio" class="boton2 boton2Des centrado">Enviar</span>
                </section>
            </form>
        </div>
        `
    }

    connectedCallback() {
        const modal = this
        const cerrar = this.dom.getElementById("cerrarModal")

        this.crearEvento(cerrar, "click", () => {
            modal.classList.add("modalOculto")
            modal.classList.remove("modalVisible")
        })

        mainControlForm(this.dom, this)
    }
}
customElements.define("modal-login", modal)