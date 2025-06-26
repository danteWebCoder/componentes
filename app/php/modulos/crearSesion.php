    <?php
        session_start();

        $_SESSION["usuario"] = $_REQUEST['nombre'];
        var_dump($_SESSION);
    ?>
