<?php
class User {
    private $conn;
    private $table = 'usuarios';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($email, $password) {
        try {
            $query = "SELECT * FROM " . $this->table . " WHERE correo = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $hashedPassword = sha1($password);
                
                if($hashedPassword === $user['contrasena']) {
                    return [
                        'success' => true,
                        'user' => [
                            'id' => $user['id'],
                            'nombre' => $user['nombre'],
                            'correo' => $user['correo']
                        ]
                    ];
                }
            }
            return [
                'success' => false,
                'message' => 'Credenciales incorrectas'
            ];
        } catch(PDOException $e) {
            throw new Exception("Error en login: " . $e->getMessage());
        }
    }

    public function register($data) {
        try {
            $query = "SELECT correo FROM " . $this->table . " WHERE correo = :correo";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':correo', $data['correo']);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                return [
                    'success' => false,
                    'message' => 'Este correo ya está registrado'
                ];
            }

            $query = "INSERT INTO " . $this->table . " 
                    (nombre, apellidos, correo, contrasena, telefono, estado, ciudad, 
                    colonia, numero_exterior, numero_interior, codigo_postal) 
                    VALUES (:nombre, :apellidos, :correo, :contrasena, :telefono, :estado, 
                    :ciudad, :colonia, :numero_exterior, :numero_interior, :codigo_postal)";

            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':apellidos', $data['apellidos']);
            $stmt->bindParam(':correo', $data['correo']);
            $hashedPassword = sha1($data['contrasena']);
            $stmt->bindParam(':contrasena', $hashedPassword);
            $stmt->bindParam(':telefono', $data['telefono']);
            $stmt->bindParam(':estado', $data['estado']);
            $stmt->bindParam(':ciudad', $data['ciudad']);
            $stmt->bindParam(':colonia', $data['colonia']);
            $stmt->bindParam(':numero_exterior', $data['numero_exterior']);
            $stmt->bindParam(':numero_interior', $data['numero_interior']);
            $stmt->bindParam(':codigo_postal', $data['codigo_postal']);

            if($stmt->execute()) {
                return [
                    'success' => true,
                    'message' => 'Registro exitoso',
                    'id' => $this->conn->lastInsertId()
                ];
            }
            return [
                'success' => false,
                'message' => 'Error al registrar usuario'
            ];
        } catch(PDOException $e) {
            throw new Exception("Error en la base de datos: " . $e->getMessage());
        }
    }
}
?>