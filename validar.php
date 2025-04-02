<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'conexion.php'; 

    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuarios WHERE Correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();
        if (password_verify($contrasena, $usuario['Contrasena'])) {
            session_start();
            $_SESSION['usuario'] = $usuario['Id_usuario'];
            header("Location: dashboard.php");
        } else {
            header("Location: login.html?error=1");
        }
    } else {
        header("Location: login.html?error=1");
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo "Método no permitido";
}
?>
