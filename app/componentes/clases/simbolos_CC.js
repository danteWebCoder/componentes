import { crearElemento } from "./../../modulos/crearElemento.js"

const crearDoms = async () => {
    const contenedoresHTML = Array.from(document.querySelectorAll(".simbolos_CC"))
    let doms = []

    contenedoresHTML.forEach((item, num) => {
        const dom = item.attachShadow({ mode: "open" })
        doms.push(dom)
/*         const ancho = item.offsetWidth
        const alto = item.offsetHeight

        const estilo = crearElemento(shadowRoot, "style")
        estilo.textContent = `
            :host {
                width: 100%;
                height: 100%;
            }

            .boxSimbolos {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 80%;
                height: 30%;

                .celda {
                    width: calc(100% / 4);
                    aspect-ratio: 1/1;
                    border: 1px solid green;
                }
            }
        `

        item.shadowRoot.innerHTML += `
            <div class="boxSimbolos">
                <div class="celda"></div> 
                <div class="celda"></div> 
                <div class="celda"></div> 
            </div>
        `

        if (num === 0) {
            const box = shadowRoot.querySelector(".boxSimbolos")
            box.style.position = "relative"
            box.style.width = "80%"
            box.style.height = "40%"
            box.style.bottom = "10%"
        }

        if (num === 2) {
            const box = shadowRoot.querySelector(".boxSimbolos")
            box.style.flexDirection = "column"
            box.style.width = "40%"
            box.style.height = "80%"

            const celdas = Array.from(box.querySelectorAll(".celda"))
            celdas.forEach(item => {
                item.style.height = "calc(100% / 4)"
                item.style.width = "70%"
            })
        }
 */    })
    return doms
}



const main = async () => {
    const simbolos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const doms = await crearDoms()
    console.log(doms)


}

main()