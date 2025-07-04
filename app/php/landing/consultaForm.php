<?php
    require "./../modulos/accionesBD.php";

    $tipo = $_POST["tipo"];
    $nombre = $_POST["nombre"];
    $password = $_POST["pass"];
    $password2 = $_POST["pass2"] ?? null;
    $idioma = $_POST['idioma'];

    header("Content-Type: application/json");
    $respuesta = consulta("nombre", $nombre);
    $datos = [];
    $datos["tipo"] = $tipo;

    if ($tipo === "login") {
        if (is_array($respuesta)) {
            $validarNombre = $respuesta["nombre"] === $nombre ? true : false;
            $validarPass = $respuesta["pass"] === $password ? true : false;
            $datos["nombre"] = $validarNombre;
            $datos["pass"] = $validarPass;

            if ($datos["nombre"] && $datos["pass"]) {
                /* crear la sesion */
            }
        } else {
            $datos["nombre"] = false;
            $datos["pass"] = false;
        }
    }

    if ($tipo === "signUp") {
        if (is_array($respuesta)) {
            $datos["nombre"] = false;
            $datos["pass"] = false;
        } else {
            $datos["nombre"] = true;
            $datos["pass"] = $password === $password2;
        }
    }

    echo json_encode($datos);
?>