document.addEventListener('DOMContentLoaded', function() {
    // Create particle effect
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-number');
    let statsStarted = false;

    function startCounting(stat) {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-item') && !statsStarted) {
                    stats.forEach(startCounting);
                    statsStarted = true;
                }
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .info-card, .stat-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Form handling with enhanced validation and animations
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('input, textarea, select');
    
    // Animate form elements on page load
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        setTimeout(() => {
            input.style.transition = 'all 0.3s ease';
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Form validation and submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <div class="btn-animation"></div>
        `;
        submitBtn.disabled = true;

        try {
            const templateParams = {
                from_name: document.getElementById('nombre').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('telefono').value,
                subject: document.getElementById('asunto').value,
                message: document.getElementById('mensaje').value,
                to_email: 'vexmxoficial@gmail.com'
            };

            const response = await emailjs.send('service_5lbtaja', 'template_65k9sai', templateParams);
            
            if (response.status === 200) {
                showModal();
                form.reset();
                resetFormStyles();
            } else {
                showNotification('Error al enviar el mensaje', 'error');
            }
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
            console.error('Error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                showInputError(input, 'Este campo es requerido');
                isValid = false;
            } else if (input.type === 'email' && !emailRegex.test(input.value)) {
                showInputError(input, 'Email inválido');
                isValid = false;
            } else if (input.id === 'telefono' && !phoneRegex.test(input.value)) {
                showInputError(input, 'Teléfono debe tener 10 dígitos');
                isValid = false;
            } else {
                removeInputError(input);
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
    }

    function removeInputError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        formGroup.classList.remove('error');
    }

    function resetFormStyles() {
        inputs.forEach(input => {
            removeInputError(input);
        });
    }

    // Modal functions
    window.showModal = function() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Enhanced notification system
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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Interactive elements animations
    const cards = document.querySelectorAll('.info-card, .feature-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});