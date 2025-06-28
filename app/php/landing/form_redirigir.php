    <?php
        $accion = $_REQUEST["accion"];
        $usuario = $_REQUEST["usuario"];
        $pass = $_REQUEST["pass"];
        $idioma = $_REQUEST["idioma"];

        echo $usuario; 
        

        if ($accion === "login") {
            header("Location: /componentes/app/public/paginas/validacion/saludar.html?usuario=$usuario");
        };
        
        if ($accion === "signUp") {
            require("./../modulos/accionesBD.php");
            crearReg(["usuario" => $usuario, "pass" => $pass, "idioma" => $idioma]);
            header("Location: /componentes/index.html?usuario=$usuario");

        };

        exit;
    ?>
