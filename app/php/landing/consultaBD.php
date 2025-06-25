<?php
    header("Content-Type: application/json");

    $config = json_decode(file_get_contents("./../_configuracion.json"), true);
    $baseSeleccionada = $config[$config["BD"]["base"]];
    $server = $baseSeleccionada["server"];
    $userBD = $baseSeleccionada["user"];
    $passBD = $baseSeleccionada["pass"];
    $name = $baseSeleccionada["name"];
    $table = $baseSeleccionada["table"];

    $tipo = $_REQUEST["tipo"];
    $nombre = $_REQUEST["nombre"];
    $password = $_REQUEST["pass"];
    $password2 = $_REQUEST["pass2"];
    $idioma = $_REQUEST['idioma'];
    $fecha = date("Y-m-d");

    $conexion = mysqli_connect($server, $userBD, $passBD, $name) or die("Error al conectar con la base de datos");
    $query_select = mysqli_query($conexion, "select id, nombre, pass, idioma 
        FROM $table WHERE nombre='$nombre'")
        or die(mysqli_error($conexion));

    $consultaDatosUsuario = mysqli_fetch_assoc($query_select);
    $consultaNombre = isset($consultaDatosUsuario) && $consultaDatosUsuario["nombre"] === $nombre ? true : false;
    $consultaPass = isset($consultaDatosUsuario) && $consultaDatosUsuario["pass"] === $password ? true : false;
    $consultaPass2 = $password2 === $password ? true : false;
    $consultaIdioma = isset($consultaDatosUsuario["idioma"]) ? $consultaDatosUsuario["idioma"] : $idioma;

    $datos = [];
    $datos["nombre"] = $consultaNombre;
    $datos["pass"] = $consultaPass;
    $datos["idioma"] = $consultaIdioma;

    if ($tipo === "login") {
        $datos["url"] = "/componentes/app/php/landing/form_redirigir.php?nombre=$nombre&idioma=$consultaIdioma&accion=login";
    }

    if ($tipo === "signUp" && !$consultaNombre && $consultaPass2) {
        $query_insert = mysqli_query($conexion, "INSERT INTO $table(nombre, pass, idioma, alta)
        VALUES ('$nombre', '$password', '$idioma', '$fecha')")
        or die(mysqli_error($conexion));
        
        $datos["pass2"] = $consultaPass2;
        $datos["url"] = "/componentes/app/php/landing/form_redirigir.php?nombre=$nombre&idioma=$consultaIdioma&accion=signUp";
    };

    echo json_encode($datos);
?>
