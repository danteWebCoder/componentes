    <?php
        $accion = $_REQUEST["accion"];
        $usuario = $_REQUEST["usuario"];

        echo $usuario; 
        

        if ($accion === "login") {
            echo "login se crea sesion antes de redirigir si no existe";
        };
        
        if ($accion === "signUp") {
            header("Location: /componentes/index.html?usuario=$usuario");
        };

        exit;
    ?>
