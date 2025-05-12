document.addEventListener('DOMContentLoaded', function() {
    const variantButtons = document.querySelectorAll('.variant-btn');
    const buyButton = document.querySelector('.buy-button');
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let selectedVariant = {
        id: 'bux-lite',
        name: 'BUX Lite',
        price: 1999.00
    };

    // Variant selection
    variantButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            variantButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected variant based on the button's content
            const title = this.querySelector('.variant-title').textContent;
            const priceText = this.querySelector('.variant-price').textContent;
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));
            
            selectedVariant = {
                id: `bux-${title.toLowerCase().replace(' ', '-')}`,
                name: title,
                price: price
            };

            // Update main price display
            document.querySelector('.current-price').textContent = `$${price.toFixed(2)}`;
            document.querySelector('.installments').textContent = `o 12 mensualidades de $${(price/12).toFixed(2)}`;
        });
    });

    // Image gallery functionality
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });

    // Quantity controls
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Buy button click handler
    buyButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(
            selectedVariant.id,
            selectedVariant.name,
            selectedVariant.price,
            'BUX',
            'images/IMG_7607.jpg',
            quantity
        );
    });
});