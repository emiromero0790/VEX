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

