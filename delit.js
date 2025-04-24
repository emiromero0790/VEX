document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const mainImageContainer = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let isZoomed = false;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {

            mainImage.src = this.src;
            mainImage.alt = this.alt;
            

            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            

            if (isZoomed) {
                toggleZoom();
            }
        });
    });


    function toggleZoom(e) {
        isZoomed = !isZoomed;
        mainImageContainer.classList.toggle('zoomed');
        
        if (isZoomed && e) {
            updateZoomPosition(e);
        } else {
            mainImage.style.transform = 'scale(1)';
        }
    }

    function updateZoomPosition(e) {
        const rect = mainImageContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        
        mainImage.style.transform = 'scale(2.5)';
        mainImage.style.transformOrigin = `${x}% ${y}%`;
    }

    mainImageContainer.addEventListener('click', toggleZoom);
    
    mainImageContainer.addEventListener('mousemove', (e) => {
        if (isZoomed) {
            updateZoomPosition(e);
        }
    });

    mainImageContainer.addEventListener('mouseleave', () => {
        if (isZoomed) {
            toggleZoom();
        }
    });


    const planButtons = document.querySelectorAll('.select-plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.parentElement.querySelector('h4').textContent;
            const price = this.parentElement.querySelector('.price').textContent;
            

            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
                alert(`Has seleccionado el ${plan} por ${price}`);
            }, 200);
        });
    });


    const customDesignBtn = document.querySelector('.custom-design-btn');
    customDesignBtn.addEventListener('click', function() {

        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            alert('Próximamente podrás solicitar tu diseño personalizado');
        }, 200);
    });


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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });


    document.querySelectorAll('.feature, .option-card, .showcase-item, .nfc-section').forEach(el => {
        observer.observe(el);
    });
});