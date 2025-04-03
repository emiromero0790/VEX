function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function validateForm() {
    const form = document.getElementById('registrationForm');
    const password = document.getElementById('contrasena').value;
    const confirmPassword = document.getElementById('confirmar_contrasena').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    const telefono = document.getElementById('telefono').value;
    if (!/^\d{10}$/.test(telefono)) {
        alert('El teléfono debe tener 10 dígitos');
        return false;
    }

    const codigoPostal = document.getElementById('codigo_postal').value;
    if (!/^\d{5}$/.test(codigoPostal)) {
        alert('El código postal debe tener 5 dígitos');
        return false;
    }

    const button = form.querySelector('.login-button');
    button.classList.add('loading');
    
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
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
});