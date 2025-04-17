<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/models/User.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        throw new Exception("Datos inválidos");
    }
    
    $requiredFields = [
        'nombre', 'apellidos', 'correo', 'contrasena', 'telefono',
        'estado', 'ciudad', 'colonia', 'numero_exterior', 'codigo_postal'
    ];
    
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("El campo $field es requerido");
        }
    }
    
    $result = $user->register($data);
    echo json_encode($result);

} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>