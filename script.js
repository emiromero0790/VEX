document.addEventListener('DOMContentLoaded', () => {
    animarEncabezado();
    agregarEventosBotones();
});

function animarEncabezado() {
    const encabezado = document.querySelector('.encabezado');

    if (encabezado) {
        encabezado.classList.add('encabezado-animado');

        setTimeout(() => {
            encabezado.classList.remove('encabezado-animado');
        }, 4000); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.submenu-login-btn');
    
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.php';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.submenu-registration-btn');
    
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            window.location.href = 'registration.php';
        });
    }
});

