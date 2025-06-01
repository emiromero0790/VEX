<?php
$to = "vexmxoficial@gmail.com";
$subject = "Correo de prueba desde XAMPP";
$message = "Hola, este es un correo de prueba enviado desde XAMPP usando mail().";
$headers = "From: vexmxoficial@gmail.com";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Correo enviado correctamente.";
} else {
    echo "❌ Error al enviar el correo.";
}
?>
