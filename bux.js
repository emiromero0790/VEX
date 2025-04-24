document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    let currentImageIndex = 0;

    function updateMainImage(index) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = thumbnails[index].src;
            mainImage.style.opacity = '1';
        }, 300);

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentImageIndex = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    const mainImageContainer = document.querySelector('.main-image');
    mainImageContainer.addEventListener('mousemove', (e) => {
        const bounds = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const xPercent = x / bounds.width;
        const yPercent = y / bounds.height;
        
        mainImage.style.transform = `scale(1.5) translate(${(0.5 - xPercent) * 40}px, ${(0.5 - yPercent) * 40}px)`;
    });

    mainImageContainer.addEventListener('mouseleave', () => {
        mainImage.style.transform = 'scale(1) translate(0, 0)';
    });

    const variantButtons = document.querySelectorAll('.variant-btn');
    const buyButton = document.querySelector('.buy-button');
    const prices = ['$1,999.00', '$2,999.00', '$3,999.00'];
    
    variantButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            variantButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            buyButton.textContent = `Comprar ahora - ${prices[index]}`;
        });
    });

    buyButton.textContent = `Comprar ahora - ${prices[0]}`;

    const elements = document.querySelectorAll('.product-info > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});