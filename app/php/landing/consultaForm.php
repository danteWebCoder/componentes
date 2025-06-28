<?php
    require "./../modulos/accionesBD.php";

    $tipo = $_REQUEST["tipo"];
    $nombre = $_REQUEST["nombre"];
    $password = $_REQUEST["pass"];
    $idioma = $_REQUEST['idioma'];

    header("Content-Type: application/json");
    $base = consulta("nombre", $nombre);
    $datos = [];

    if ($tipo === "login") {
        if (is_array($base)) {
            $validarNombre = $base["nombre"] === $nombre ? true : false;
            $validarPass = $base["pass"] === $password ? true : false;

            $datos["nombre"] = $validarNombre;
            $datos["pass"] = $validarPass;
        } else {
            $datos["nombre"] = false;
            $datos["pass"] = false;
        }
    }

    if ($tipo === "signUp") {
        $password2 = $_REQUEST['pass2'];
        $compararPass = $password === $password2;

        if (is_array($base)) {
            $datos["nombre"] = false;
            $datos["compararPass"] = "";
        } else {
            $validarPass = $password2 === $password ? true : false;
            $datos["nombre"] = true;
            $datos["compararPass"] = $validarPass;
        }     
    }

    echo json_encode($datos);
?>