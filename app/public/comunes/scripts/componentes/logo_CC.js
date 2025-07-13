const contenedor = document.getElementById("logo_CC")
const dom = contenedor.attachShadow({ mode: "open" })
const urlFondo = new URL("./../../../recursos/imagenes/fondoLogo.png", import.meta.url).href

const textoFrente1 = "dante"
const textoFrente2 = "web developer"
const fuente = "Anta"

dom.innerHTML = `
        <div class="caja">
            <div class="caja3d">
                <div class="cajaFondo"></div>

                <div class="capa">
                    <div class="marco"></div>
                    <div class="separador"></div>
                    <div class="circulo"></div>
                    <h4 class="texto">${textoFrente1.toUpperCase()}</h4>
                    <h4 class="texto">${textoFrente2.toUpperCase()}</h4>
                </div>
            </div>
        </div>
    `

const estilo = document.createElement("style")
estilo.textContent = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${fuente};
    }

    :host {
        width: 100%;
        height: 100%;
        --colorBack: rgba(255, 255, 255, 0.06);
        --colorTextCapa: rgb(220, 220, 220);
        --transicion: 4s ease-in-out;
    }

    .caja {
        width: 100%;
        height: 100%;
        perspective: 1000px;

        &:hover > .caja3d .cajaFondo {transform: rotateY(50deg); background-position: right;}

        &:hover > .caja3d .capa {
            transform: rotateY(50deg) translateZ(2px);

            .separador {box-shadow: 0 0 12px rgb(255, 0, 128), 0 0 12px rgb(255, 0, 128);}
            .circulo {box-shadow: 0 0 12px rgb(255, 0, 128), inset 0 0 12px rgb(255, 0, 128);}
        }

        .caja3d {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;

            .cajaFondo {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                border-radius: 8px;
                background-image: url(${urlFondo});
                background-size: 200%;
                background-position: left;
                background-repeat: no-repeat;
                transition: var(--transicion);
            }

            .capa {
                position: absolute;
/*                 z-index: 2;
 */                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
                height: 100%;
                perspective: 1000px;
                transform-style: preserve-3d;
                transform: translateZ(2px);  /* correccion de 2px para no pisar las capas */
                transition: var(--transicion);

                .texto {
                    letter-spacing: 2px;
                    color: var(--colorTextCapa);
                    transform: translateZ(100px);
                    font-size: 12px;
                    margin: 12%;
                }

                .separador, .circulo {
                    transition: var(--transicion);
                    position: absolute;
                }
                
                .separador {
                    width: 80px;
                    height: 0px;
                    border: 1px solid white;
                    box-shadow: 0 0 6px cyan, 0 0 6px cyan;
                }

                .circulo {
                    width: 14%;
                    aspect-ratio: 1/1;
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 0 6px cyan, inset 0 0 6px cyan;
                }

                .marco {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 12px solid rgba(255, 255, 255, 0.16);
/*                     outline: 2px solid rgba(255, 255, 255, 0.2);
 */                    border-radius: 8px;
                }
            }
        }
    }
`
dom.appendChild(estilo)