document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('billingForm');
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


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <span>Procesando...</span>
            <div class="btn-animation"></div>
        `;
        submitBtn.disabled = true;

        try {
            await simulateFormSubmission();
            showNotification('¡Factura generada con éxito! Se enviará a tu correo electrónico.', 'success');
            form.reset();
            resetFormStyles();
        } catch (error) {
            showNotification('Hubo un error al generar la factura. Por favor, intenta de nuevo.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    function validateForm() {
        let isValid = true;
        const rfcRegex = /^[A-ZÑ&]{3,4}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const cpRegex = /^\d{5}$/;

        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                showInputError(input, 'Este campo es requerido');
                isValid = false;
            } else {
                switch (input.id) {
                    case 'rfc':
                        if (!rfcRegex.test(input.value.toUpperCase())) {
                            showInputError(input, 'RFC inválido');
                            isValid = false;
                        }
                        break;
                    case 'email':
                        if (!emailRegex.test(input.value)) {
                            showInputError(input, 'Email inválido');
                            isValid = false;
                        }
                        break;
                    case 'telefono':
                        if (!phoneRegex.test(input.value)) {
                            showInputError(input, 'Teléfono debe tener 10 dígitos');
                            isValid = false;
                        }
                        break;
                    case 'cp':
                        if (!cpRegex.test(input.value)) {
                            showInputError(input, 'Código postal debe tener 5 dígitos');
                            isValid = false;
                        }
                        break;
                }
            }
        });

        return isValid;
    }

    function showInputError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        formGroup.classList.add('error');
        input.style.borderColor = '#ff4444';
    }

    function removeInputError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        formGroup.classList.remove('error');
        input.style.borderColor = '';
    }

    function resetFormStyles() {
        inputs.forEach(input => {
            removeInputError(input);
        });
    }

    function simulateFormSubmission() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' ? '✓' : '✕';
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-message">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        });
    }


    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animation = `floatAnimation 4s ease-in-out infinite ${index * 0.5}s`;
    });


    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.closest('.form-group').classList.remove('focused');
        });
    });
});