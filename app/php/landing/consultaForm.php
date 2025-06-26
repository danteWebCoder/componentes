<?php
require "./../modulos/consultas.php";

$tipo = $_REQUEST["tipo"];
$nombre = $_REQUEST["nombre"];
$password = $_REQUEST["pass"];
$idioma = $_REQUEST['idioma'];
$fecha = date("Y-m-d");

header("Content-Type: application/json");
$base = consultaUsuario("nombre", $nombre);
$datosLogin = [];

if ($tipo === "login") {

    if (is_array($base)) {
        $validarNombre = $base["nombre"] === $nombre ? true : false;
        $validarPass = $base["pass"] === $password ? true : false;

        $datosLogin["nombre"] = $validarNombre;
        $datosLogin["pass"] = $validarPass;
    } else {
        $datosLogin["nombre"] = false;
        $datosLogin["pass"] = false;
    }
}

if ($tipo === "signUp") {
    $password2 = $_REQUEST['pass2'];
    $compararPass = $password === $password2;

    if (is_array($base)) {

        $datosLogin["nombre"] = false;
        $datosLogin["compararPass"] = "";
    } else {
        $validarPass = $password2 === $password ? true : false;

        $datosLogin["nombre"] = true;
        $datosLogin["compararPass"] = $validarPass;

    }
}

echo json_encode($datosLogin);



/*     if ($tipo === "login" && $consultaNombre && $consultaPass) {
        echo "redirigir ..."
    } else {
    }

    if ($tipo === "signUp" && !$consultaNombre && $consultaPass2) {
        $query_insert = mysqli_query($conexion, "INSERT INTO $table(nombre, pass, idioma, alta)
        VALUES ('$nombre', '$password', '$idioma', '$fecha')")
        or die(mysqli_error($conexion));
        
        $datos["pass2"] = $consultaPass2;
    };
 */
