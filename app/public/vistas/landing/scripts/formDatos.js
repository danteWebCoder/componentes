export const enviarForm = async (tipo, campos) => {
    const parametros = new URLSearchParams()
    parametros.append("tipo", tipo)
    parametros.append("correo", campos[0].value)
    parametros.append("pass", campos[1].value)
    parametros.append("pass2", campos[2].value)
    parametros.append("idioma", document.querySelector("vista-landing").shadowRoot.querySelector(".cajaIdiomas .inputOculto:checked").id)
    const url = "/componentes/app/php/landing/accionesForm.php"
    return await fetchConsulta(url, parametros)
}

export const enviarSolicitudPass = async (mail) => {
    const parametros = new URLSearchParams()
    parametros.append("tipo", "passPerdido")
    parametros.append("correo", mail)
    const url = "/componentes/app/php/landing/accionesForm.php"
    return await fetchConsulta(url, parametros)
}

export const fetchConsulta = async (url, parametros) => {
    let datos
    try {
        const datosRecibidos = await fetch(
            url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: parametros
        })
        datos = await datosRecibidos.text()
    } catch (error) {
        console.log(error)
    }
    return datos
}
