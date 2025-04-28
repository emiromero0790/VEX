document.addEventListener('DOMContentLoaded', function() {

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        }
        
        lastScroll = currentScroll;
    });


    const mainImage = document.querySelector('.gallery-main');
    const thumbnails = document.querySelectorAll('.thumb');
    let isZoomed = false;

    mainImage.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        isZoomed = !isZoomed;
        
        if (isZoomed) {
            document.body.style.overflow = 'hidden';
            this.style.cursor = 'zoom-out';
        } else {
            document.body.style.overflow = '';
            this.style.cursor = 'zoom-in';
        }
    });

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });


    const stats = document.querySelectorAll('.stat-number');
    let statsStarted = false;

    function startCounting(stat) {
        const target = parseInt(stat.getAttribute('data-target'));
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


    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-item')) {
                    entry.target.classList.add('visible');
                    if (!statsStarted) {
                        stats.forEach(startCounting);
                        statsStarted = true;
                    }
                } else {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);


    document.querySelectorAll('.feature-card, .pricing-card, .stat-item').forEach(el => {
        observer.observe(el);
    });


    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

 
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito!', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }


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

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }


    const heroImage = document.querySelector('.hero-image');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});