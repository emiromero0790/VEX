class LoginManager {
    constructor() {
        this.apiUrl = 'http://localhost/VEX/procesar_login.php';
        this.initializeEventListeners();
        this.animateInputs();
    }

    initializeEventListeners() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    async handleLogin() {
        const button = document.querySelector('.login-button');
        button.classList.add('loading');
        
        const userData = {
            correo: document.getElementById('correo').value,
            contrasena: document.getElementById('contrasena').value
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
                localStorage.setItem('user', JSON.stringify({
                    nombre: result.user.nombre,
                    correo: result.user.correo,
                    isLoggedIn: true
                }));
                
                const previousPage = document.referrer || 'index.html';
                window.location.href = previousPage;
            } else {
                this.showNotification(result.message || 'Error al iniciar sesión', 'error');
            }
        } catch (error) {
            this.showNotification('Error al conectar con el servidor', 'error');
            console.error('Error:', error);
        } finally {
            button.classList.remove('loading');
        }
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

let loginManager;
document.addEventListener('DOMContentLoaded', () => {
    loginManager = new LoginManager();
    window.togglePassword = (inputId) => {
        const input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
    };
});