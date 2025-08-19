export class vistaBase extends HTMLElement {
    static eventos = []

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

    crearEvento(elemento, accion, callback) {
        elemento.addEventListener(accion, callback)
        vistaBase.eventos.push({ elemento, accion, callback })
    }

    eliminarEventos() {
        vistaBase.eventos.forEach(evento => {
            evento.elemento.removeEventListener(evento.accion, evento.callback)
        })
        vistaBase.eventos.length = 0
    }

    eliminarEventoSimple(obj, accion) {
        const evento = vistaBase.eventos.find(item => item.elemento === obj && item.accion === accion)
        const index = vistaBase.eventos.findIndex(item => item.elemento === obj && item.accion === accion)
        evento.elemento.removeEventListener(evento.accion, evento.callback)
        vistaBase.eventos.splice(index, 1)
    }

    destruirVista() {
        this.eliminarEventos()
    }
}