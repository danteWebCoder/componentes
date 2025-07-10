<?php
    require "./../modulos/accionesBD.php";

    $tipo = $_POST["tipo"];
    $usuario = $_POST["usuario"];
    $password = $_POST["pass"];
    $password2 = $_POST["pass2"] ?? null;
    $idioma = $_POST['idioma'];

    header("Content-Type: application/json");
    $respuesta = consulta("usuario", $usuario);
    $datos = [];
    $datos["tipo"] = $tipo;

    if ($tipo === "login") {
        if (is_array($respuesta)) {
            $validarUsuario = $respuesta["usuario"] === $usuario ? true : false;
            $validarPass = $respuesta["pass"] === $password ? true : false;
            $datos["usuario"] = $validarUsuario;
            $datos["pass"] = $validarPass;

            if ($datos["usuario"] && $datos["pass"]) {
                /* crear la sesion */
            }
        } else {
            $datos["usuario"] = false;
            $datos["pass"] = false;
        }
    }

    if ($tipo === "signUp") {
        if (is_array($respuesta)) {
            $datos["usuario"] = false;
            $datos["pass"] = false;
        } else {
            $datos["usuario"] = true;
            $datos["pass"] = $password === $password2;

            if ($datos["pass"]) crearReg(["usuario" => $usuario, "pass" => $password, "idioma" => $idioma]);
        }
    }

    echo json_encode($datos);
?>