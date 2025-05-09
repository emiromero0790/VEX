class RegistrationManager {
    constructor() {
        this.apiUrl = 'http://localhost/VEX/procesar_registro.php';
        this.initializeEventListeners();
        this.animateInputs();
    }

    initializeEventListeners() {
        const form = document.getElementById('registrationForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegistration();
        });
    }

    async handleRegistration() {
        if (!this.validateForm()) {
            return;
        }

        const button = document.querySelector('.login-button');
        button.classList.add('loading');
        
        const userData = {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            correo: document.getElementById('correo').value,
            contrasena: document.getElementById('contrasena').value,
            telefono: document.getElementById('telefono').value,
            estado: document.getElementById('estado').value,
            ciudad: document.getElementById('ciudad').value,
            colonia: document.getElementById('colonia').value,
            numero_exterior: document.getElementById('numero_exterior').value,
            numero_interior: document.getElementById('numero_interior').value || null,
            codigo_postal: document.getElementById('codigo_postal').value
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showNotification('Registro exitoso', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                this.showNotification(result.message || 'Error al registrar usuario', 'error');
            }
        } catch (error) {
            this.showNotification('Error al conectar con el servidor', 'error');
            console.error('Error:', error);
        } finally {
            button.classList.remove('loading');
        }
    }

    validateForm() {
        const password = document.getElementById('contrasena').value;
        const confirmPassword = document.getElementById('confirmar_contrasena').value;
        
        if (password !== confirmPassword) {
            this.showNotification('Las contraseñas no coinciden', 'error');
            return false;
        }

        const telefono = document.getElementById('telefono').value;
        if (!/^\d{10}$/.test(telefono)) {
            this.showNotification('El teléfono debe tener 10 dígitos', 'error');
            return false;
        }

        const codigoPostal = document.getElementById('codigo_postal').value;
        if (!/^\d{5}$/.test(codigoPostal)) {
            this.showNotification('El código postal debe tener 5 dígitos', 'error');
            return false;
        }

        return true;
    }

    animateInputs() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input, index) => {
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            setTimeout(() => {
                input.style.transition = 'all 0.3s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showNotification(message, type) {
        const container = type === 'error' ? 'error-message' : 'success-message';
        const div = document.getElementById(container);
        div.textContent = message;
        div.style.display = 'block';
        if (type === 'error') {
            setTimeout(() => {
                div.style.display = 'none';
            }, 3000);
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

let registrationManager;
document.addEventListener('DOMContentLoaded', () => {
    registrationManager = new RegistrationManager();
    window.togglePassword = (inputId) => {
        const input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
    };
});