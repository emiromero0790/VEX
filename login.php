<?php
session_start();
include 'conexion.php'; 

$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = trim($_POST['correo']);
    $contrasena = trim($_POST['contrasena']);
    $contrasena_sha1 = sha1($contrasena); 

    $sql = "SELECT * FROM usuarios WHERE correo = :correo AND contrasena = :contrasena";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":correo", $correo, PDO::PARAM_STR);
    $stmt->bindParam(":contrasena", $contrasena_sha1, PDO::PARAM_STR);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
        $_SESSION['usuario'] = $usuario['id_usuario'];
        header("Location: index.html");
        exit();
    } else {
        $error = "Correo o contraseña incorrectos";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VEX - Login</title>
    <link rel="stylesheet" href="login.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>
    
    <div class="container">
        <div class="login-container">
            <div class="side-image">
                <div class="overlay">
                    <h2>Bienvenido a VEX</h2>
                    <p>Innovación y tecnología a tu alcance</p>
                </div>
            </div>
            <div class="login-content">
                <div class="logo-container">
                    <img src="images/v3333_3.png" alt="VEX Logo" class="logo">
                </div>
                <h1>Bienvenido de nuevo</h1>
                <p class="subtitle">Inicia sesión para continuar</p>

                <?php if ($error): ?>
                    <div id="error-message" style="color: red; text-align: center; margin-bottom: 15px;">
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>
                
                <div id="error-message" style="display: none; color: var(--error-color); text-align: center; margin-bottom: 15px;"></div>
                
                <form class="login-form" action="login.php" method="POST">
                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <div class="input-container">
                            <span class="input-icon">✉️</span>
                            <input type="email" id="email" name="correo" placeholder="ejemplo@correo.com" required>
                            <span class="focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <div class="input-container">
                            <span class="input-icon">🔒</span>
                            <input type="password" id="password" name="contrasena" placeholder="••••••••" required>
                            <button type="button" class="toggle-password" id="toggle_password">👁️</button>
                            <span class="focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="options-group">
                        <label class="remember-me">
                            <input type="checkbox" id="remember">
                            <span class="custom-checkbox"></span>
                            Recordarme
                        </label>
                        <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <button type="submit" class="login-button">
                        <span>Iniciar Sesión</span>
                        <div class="button-loader"></div>
                    </button>
                </form>
                
                <div class="divider">
                    <span>o continúa con</span>
                </div>
                
                <div class="social-login">
                    <button type="button" class="social-button google" onclick="socialLogin('google')">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMTcuNjQgOS4yMDVjMC0uNjM5LS4wNTctMS4yNTItLjE2NC0xLjg0MUg5djMuNDgxaDQuODQ0YTQuMTQgNC4xNCAwIDAgMS0xLjc5NiAyLjcxNnYyLjI1OWgyLjkwOGMxLjcwMi0xLjU2NyAyLjY4NC00Ljg3MiAyLjY4NC04LjYxNXoiLz48cGF0aCBmaWxsPSIjMzRBODUzIiBkPSJNOSAxOGMzLjI0IDAgNS45NTYtMS4wNzUgNy45NDgtMi45MTJsLTIuOTA4LTIuMjU5Yy0uODA2LjU0LTEuODM3Ljg2LTMuMDQuODYtMi4zNDQgMC00LjMyOC0xLjU4NC01LjAzNi0zLjcxMUguOTU3djIuMzMyQTguOTk3IDguOTk3IDAgMCAwIDkgMTh6Ii8+PHBhdGggZmlsbD0iI0ZCQkMwNSIgZD0iTTMuOTY0IDEwLjcxQTUuNDEgNS40MSAwIDAgMSAzLjY4MiA5YzAtLjU5My4xMDItMS4xNy4yODItMS43MlY0Ljk0OEguOTU3QTguOTk2IDguOTk2IDAgMCAwIDAgOWMwIDEuNDUyLjM0OCAyLjgyNy45NTcgNC4wNDJsMy4wMDctMi4zMzJ6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTkgMy41OGMxLjMyMSAwIDIuNTA4LjQ1NCAzLjQ0IDEuMzQ1bDIuNTgyLTIuNThDMTMuNDYzLjg5MSAxMS40MiAwIDkgMEE4Ljk5NyA4Ljk5NyAwIDAgMCAuOTU3IDQuOTQ4TDMuOTY0IDcuMjhDNC42NzIgNS4xNTMgNi42NTYgMy41OCA5IDMuNTh6Ii8+PC9zdmc+" alt="Google">
                        Google
                    </button>
                    <button type="button" class="social-button facebook" onclick="socialLogin('facebook')">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48cGF0aCBmaWxsPSIjMTk3N0YzIiBkPSJNMTggOUMxOCA0LjAzIDEzLjk3IDAgOSAwUzAgNC4wMyAwIDlzNC4wMyA5IDkgOWMuODMgMCAxLjUtLjY3IDEuNS0xLjV2LTRoMy43NUMxNi4zMyAxMi41IDE4IDEwLjgzIDE4IDl6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTcuNSAxMy41aDJ2LTRoMi41bC41LTJoLTN2LTFjMC0uNTUuNDUtMSAxLTFoMlYzLjVoLTJjLTEuNjYgMC0zIDEuMzQtMyAzdjFoLTJ2MmgydjR6Ii8+PC9zdmc+" alt="Facebook">
                        Facebook
                    </button>
                    <button type="button" class="social-button apple" onclick="socialLogin('apple')">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDM4NCA1MTIiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0zMTguNyAyNjguN2MtLjItMzYuNyAxNi40LTY0LjQgNTAtODQuOC0xOC44LTI2LjktNDcuMi00MS43LTg0LjctNDQuNi0zNS41LTIuOC03NC4zIDIwLjctODguNSAyMC43LTE1IDAtNDkuNC0xOS43LTc2LjQtMTkuN0M2My4zIDE0MS4yIDQgMTg0LjggNCAyNzMuNWMwIDI2LjIgNC44IDUzLjMgMTQuNCA4MS4yIDEyLjggMzcuNyA1OS4yIDEyNi4zIDEwNy4yIDEyNS4yIDI1LjItLjYgNDMtMTcuOSA3NS44LTE3LjkgMzEuOCAwIDQ4LjMgMTcuOSA3Ni40IDE3LjkgNDguNi0uNyA5MC40LTgyLjUgMTAyLjYtMTIwLjItNjUuMi0zMC43LTYxLjctOTA5LTYxLjctOTEuMnpNMjU2LjIgMzIuNGMyMy4yLTI4LjIgMjAuMi02OS41IDE5LjktNzIuN2wtMS45LS4yYy0uMSAxLjEtNy4yIDM2LjMtMjQuMyA2NC43LTIwLjUgMzQuMS00NC43IDU0LjctNzkuMiA1NC43LTEuNCAwLTIuOCAwLTQtLjEgMi4xIDI1LjkgOS41IDUwLjYgMjIuNCA3Mi45SDIyNGMzNS4yLS4xIDYxLjEtMTYuOCAzMi4yLTQ3LjN6Ii8+PC9zdmc+" alt="Apple">
                        Apple
                    </button>
                </div>
                
                <p class="signup-text">
                    ¿No tienes una cuenta? <a href="#" class="signup-link">Regístrate</a>
                </p>

                <div class="language-selector">
                    <button type="button" class="language-button">
                        🌐 Español
                        <span class="arrow">▼</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="toggle-password.js"></script>
</body>
</html>