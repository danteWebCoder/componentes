<?php
function conectarBD() {
    $config = json_decode(file_get_contents("./../_configuracion.json"), true);
    $nombreBD = $config["BD"]["base"];
    $BD = $config[$nombreBD];
    $serverBD = $BD["server"];
    $userBD = $BD["user"];
    $passBD = $BD["pass"];
    $tableBD = $BD["table"];
    $conexion = mysqli_connect($serverBD, $userBD, $passBD, $nombreBD) or die("Error al conectar con la base de datos");
    return [$conexion, $tableBD];
}

function consulta($item, $valor) {
    $datos = conectarBD();
    $conexion = $datos[0];
    $tabla = $datos[1];
    
    $query = mysqli_query($conexion, "select id, correo, pass, idioma 
        FROM $tabla WHERE $item = '$valor'")
        or die(mysqli_error($conexion));

    $datosConsulta = mysqli_fetch_assoc($query);
    mysqli_close($conexion);
    return $datosConsulta;
}

function crearReg($array) {
    $datos = conectarBD();
    $conexion = $datos[0];
    $tabla = $datos[1];
    
    $datosCorreo = $array["correo"];
    $datosPass = $array["pass"];
    $datosIdioma = $array["idioma"];    
    $datosFechaAlta = date("Y-m-d H:i:s");

    $query = mysqli_query($conexion, "insert into $tabla (correo, pass, idioma, fecha_alta) 
        VALUES ('$datosCorreo', '$datosPass', '$datosIdioma', '$datosFechaAlta')")
        or die(mysqli_error($conexion));

    mysqli_close($conexion);
}
?>