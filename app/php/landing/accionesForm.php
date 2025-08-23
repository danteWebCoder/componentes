<?php
    require "./../modulos/accionesBD.php";
    
    $tipo = $_POST["tipo"];
    $correo = $_POST["correo"];
    $password = $_POST["pass"] ?? null;
    $password2 = $_POST["pass2"] ?? null;
    $idioma = $_POST['idioma'] ?? null;

    header("Content-Type: application/json");
    $respuesta = consulta("correo", $correo);
    $datos = [];
    $datos["tipo"] = $tipo;
    $datos["correo"] = false;
    $datos["pass"] = false;
    $datos["passRep"] = false;

    if ($tipo === "login" && $respuesta) {
        $datos["correo"] = true;
        $datos["pass"] = $respuesta["pass"] === $password ? true : false;
    }

    if ($tipo === "signUp" && !$respuesta) {
        if ($password === $password2) {
            crearReg(["correo" => $correo, "pass" => $password, "idioma" => $idioma]);
            $datos["passRep"] = true;
        } 
    }

    if ($tipo === "recuperarPass" && $respuesta) {
        $datos["correo"] = true;
        /* llamar a recuperar pass */
    }

    echo json_encode($datos);
?>