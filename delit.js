document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            
            // Add zoom effect to main image
            mainImage.style.transform = 'scale(1.02)';
            setTimeout(() => {
                mainImage.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Plan Selection
    const planButtons = document.querySelectorAll('.select-plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.parentElement.querySelector('h4').textContent;
            const price = this.parentElement.querySelector('.price').textContent;
            
            // Animate button
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
                alert(`Has seleccionado el ${plan} por ${price}`);
            }, 200);
        });
    });

    // Custom Design Request
    const customDesignBtn = document.querySelector('.custom-design-btn');
    customDesignBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            // Here you would typically open a modal or redirect to a form
            alert('Próximamente podrás solicitar tu diseño personalizado');
        }, 200);
    });

    // Smooth Scroll
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

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    document.querySelectorAll('.feature, .option-card, .showcase-item').forEach(el => {
        observer.observe(el);
    });
});