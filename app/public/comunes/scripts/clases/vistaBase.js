export class vistaBase extends HTMLElement {

    importarCss(dom, ruta) {
        const estilo = document.createElement("link")
        estilo.rel = "stylesheet"
        estilo.href = ruta
        dom.appendChild(estilo)
    }

    importarGF(dom, ruta) {
        const link = () => {
            const estilo = document.createElement("link")
            estilo.rel = "stylesheet"
            estilo.href = ruta
            return estilo
        }
        dom.appendChild(link())
        document.head.appendChild(link())
    }

    importarScript(dom, ruta, type = null) {
        const script = document.createElement("script")
        script.src = ruta
        type ? script.type = "module" : null
        dom.appendChild(script)
    }    
}