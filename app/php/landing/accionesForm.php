<?php
    require "./../modulos/accionesBD.php";
    
    $tipo = $_POST["tipo"];
    $correo = $_POST["correo"];
    $password = $_POST["pass"];
    $password2 = $_POST["pass2"];
    $idioma = $_POST['idioma'];

    header("Content-Type: application/json");
    $respuesta = consulta("correo", $correo);
    $datos = [];
    $datos["tipo"] = $tipo;

    if ($tipo === "login") {
        if (is_array($respuesta)) {
            $validarcorreo = $respuesta["correo"] === $correo ? true : false;
            $validarPass = $respuesta["pass"] === $password ? true : false;
            $datos["correo"] = $validarcorreo;
            $datos["pass"] = $validarPass;

            if ($datos["correo"] && $datos["pass"]) {

            }
        } else {
            $datos["correo"] = false;
            $datos["pass"] = false;
        }
    }

    if ($tipo === "signUp") {
        if (is_array($respuesta)) {
            $datos["correo"] = false;
            $datos["pass"] = false;
        } else {
            $datos["correo"] = true;
            $datos["pass"] = $password === $password2;

            if ($datos["pass"]) crearReg(["correo" => $correo, "pass" => $password, "idioma" => $idioma]);
        }
    }

    echo json_encode($datos);
?>