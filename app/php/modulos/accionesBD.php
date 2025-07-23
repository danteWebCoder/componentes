<?php
function consulta($item, $valor) {
    $config = json_decode(file_get_contents("./../_configuracion.json"), true);
    $nombreBD = $config["BD"]["base"];
    $BD = $config[$nombreBD];
    $serverBD = $BD["server"];
    $userBD = $BD["user"];
    $passBD = $BD["pass"];
    $tableBD = $BD["table"];

    $conexion = mysqli_connect($serverBD, $userBD, $passBD, $nombreBD) or die("Error al conectar con la base de datos");
    $query = mysqli_query($conexion, "select id, correo, pass, idioma 
        FROM $tableBD WHERE $item = '$valor'")
        or die(mysqli_error($conexion));

    $datosConsulta = mysqli_fetch_assoc($query);
    mysqli_close($conexion);
    return $datosConsulta;
}

function crearReg($array) {
    $config = json_decode(file_get_contents("./../_configuracion.json"), true);
    $nombreBD = $config[$config["BD"]["base"]];
    $BD = $config[$nombreBD];
    $serverBD = $BD["server"];
    $userBD = $BD["user"];
    $passBD = $BD["pass"];
    $tableBD = $BD["table"];

    $datosCorreo = $array["correo"];
    $datosPass = $array["pass"];
    $datosIdioma = $array["idioma"];    
    $datosFechaAlta = date("Y-m-d");

    $conexion = mysqli_connect($serverBD, $userBD, $passBD, $nombreBD) or die("Error al conectar con la base de datos");
    $query = mysqli_query($conexion, "insert into $tableBD(correo, pass, idioma, alta) 
        VALUES ('$datosCorreo', '$datosPass', '$datosIdioma', '$datosFechaAlta')")
        or die(mysqli_error($conexion));
}

?>