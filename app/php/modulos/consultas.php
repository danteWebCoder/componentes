<?php
function consultaUsuario($item, $valor) {
    $config = json_decode(file_get_contents("./../_configuracion.json"), true);
    $baseSeleccionada = $config[$config["BD"]["base"]];
    $server = $baseSeleccionada["server"];
    $userBD = $baseSeleccionada["user"];
    $passBD = $baseSeleccionada["pass"];
    $name = $baseSeleccionada["name"];
    $table = $baseSeleccionada["table"];

    $conexion = mysqli_connect($server, $userBD, $passBD, $name) or die("Error al conectar con la base de datos");
    $query = mysqli_query($conexion, "select id, nombre, pass, idioma 
        FROM $table WHERE $item = '$valor'")
        or die(mysqli_error($conexion));

    $datosConsulta = mysqli_fetch_assoc($query);
    mysqli_close($conexion);
    return $datosConsulta;
}

?>