<html>

<body>
    <?php
    $accionForm = $_REQUEST["tipo"];
    $nombre = $_REQUEST["user"];
    $password = $_REQUEST["password"];
    $passwordConfirmed = isset($_REQUEST["passwordConfirmed"]) ? $_REQUEST["passwordConfirmed"] : null;
    $idioma = $_REQUEST['idioma'];
    $fecha = date("Y-m-d");
    $bd = mysqli_connect("localhost", "root", "", "usuarios") or die("Error al conectar con la base de datos");

    if ($accionForm ===  "signUp" && $password === $passwordConfirmed) {
        echo "correcto";
        mysqli_query($bd, "insert into datoslogin (nombre, pass, idioma, alta)
        values('$nombre', '$password', '$idioma', '$fecha')") 
        or die ("Error al guardar los datos");
    };
    ?>
</body>

</html>