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
        if (!$respuesta) {
            $datos["correo"] = "noExiste";
            $datos["pass"] = "noExiste";

            if ($datos["correo"] && $datos["pass"]) {

            }
        } else {
            $validarcorreo = $respuesta["correo"] === $correo ? "existe" : "noExiste";
            $validarPass = $respuesta["pass"] === $password ? "correcto" : "incorrecto";
            $datos["correo"] = $validarcorreo;
            $datos["pass"] = $validarPass;
        }
    }

    if ($tipo === "signUp") {
        $validarPass = $password === $password2 ? "igual" : "diferente";

        if (!$respuesta) {
            $datos["correo"] = "noExiste";
            $datos["passRep"] = $validarPass;

            if ($validarPass === "igual") crearReg(["correo" => $correo, "pass" => $password, "idioma" => $idioma]);
        } else {
            $datos["correo"] = "existe";
        }
    }

    echo json_encode($datos);
?>