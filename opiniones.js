document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const ratingText = document.querySelector('.rating-text');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackList = document.getElementById('feedbackList');
    const imageInput = document.getElementById('feedbackImages');
    const imagePreview = document.getElementById('imagePreview');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentRating = 0;
    let currentFilter = 'all';

    // Star rating functionality with improved animation
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            updateStars(rating, true);
            updateRatingText(rating);
        });

        star.addEventListener('mouseout', function() {
            updateStars(currentRating, false);
            updateRatingText(currentRating);
        });

        star.addEventListener('click', function() {
            currentRating = this.dataset.rating;
            updateStars(currentRating, false);
            updateRatingText(currentRating);
            
            // Add celebration animation
            celebrateRating();
        });
    });

    function updateStars(rating, isHover) {
        stars.forEach(star => {
            const starRating = star.dataset.rating;
            star.classList.toggle('active', starRating <= rating);
            
            if (isHover) {
                star.style.transform = starRating <= rating ? 'scale(1.2) rotate(5deg)' : 'scale(1)';
            } else {
                star.style.transform = 'scale(1)';
            }
        });
    }

    function celebrateRating() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        document.body.appendChild(celebration);
        
        setTimeout(() => celebration.remove(), 1000);
    }

    function updateRatingText(rating) {
        const texts = {
            0: 'Selecciona una calificación',
            1: 'Necesitamos mejorar mucho',
            2: 'Hay aspectos por mejorar',
            3: 'Experiencia regular',
            4: 'Buena experiencia',
            5: '¡Experiencia excepcional!'
        };
        ratingText.textContent = texts[rating] || texts[0];
    }

    // Enhanced file upload with drag and drop
    const dropZone = document.querySelector('.file-upload-label');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('highlight');
    }

    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        imagePreview.innerHTML = '';
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.addEventListener('click', () => {
                        img.classList.toggle('enlarged');
                    });
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    imageInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    // Enhanced form submission with animation
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (currentRating === 0) {
            showNotification('Por favor, selecciona una calificación', 'error');
            return;
        }

        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span><div class="submit-btn-bg"></div>';

        const feedbackData = {
            rating: currentRating,
            type: document.getElementById('feedbackType').value,
            title: document.getElementById('feedbackTitle').value,
            message: document.getElementById('feedbackMessage').value,
            date: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        // Simulate API call
        setTimeout(() => {
            addFeedbackToList(feedbackData);
            feedbackForm.reset();
            currentRating = 0;
            updateStars(0, false);
            updateRatingText(0);
            imagePreview.innerHTML = '';
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Enviar Feedback</span><div class="submit-btn-bg"></div>';
            
            showNotification('¡Gracias por tu feedback!', 'success');
        }, 1000);
    });

    // Feedback filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterFeedback();
        });
    });

    function filterFeedback() {
        const items = document.querySelectorAll('.feedback-item');
        items.forEach(item => {
            const type = item.querySelector('.feedback-type').classList[1];
            if (currentFilter === 'all' || type === currentFilter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function addFeedbackToList(feedback) {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        feedbackItem.style.opacity = '0';
        feedbackItem.style.transform = 'translateY(20px)';
        
        feedbackItem.innerHTML = `
            <div class="feedback-header">
                <h3 class="feedback-title">${escapeHtml(feedback.title)}</h3>
                <div class="feedback-rating">${'★'.repeat(feedback.rating)}${'☆'.repeat(5-feedback.rating)}</div>
            </div>
            <span class="feedback-type ${feedback.type}">${feedback.type}</span>
            <p class="feedback-content">${escapeHtml(feedback.message)}</p>
            <small class="feedback-date">${feedback.date}</small>
        `;

        feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);
        
        // Trigger animation
        setTimeout(() => {
            feedbackItem.style.opacity = '1';
            feedbackItem.style.transform = 'translateY(0)';
        }, 10);
    }

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

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Add sample feedback
    const sampleFeedback = [
        {
            rating: 5,
            type: 'opinion',
            title: 'Servicio excepcional',
            message: 'La atención al cliente fue extraordinaria. El equipo demostró un alto nivel de profesionalismo y amabilidad.',
            date: '15 de enero de 2024'
        },
        {
            rating: 4,
            type: 'sugerencia',
            title: 'Más opciones de pago',
            message: 'El servicio es excelente, pero sería genial tener más opciones de pago como PayPal o criptomonedas.',
            date: '14 de enero de 2024'
        },
        {
            rating: 5,
            type: 'mejora',
            title: 'Interfaz intuitiva',
            message: 'La nueva interfaz es muy fácil de usar. Las últimas actualizaciones han mejorado significativamente la experiencia.',
            date: '13 de enero de 2024'
        }
    ];

    sampleFeedback.forEach(feedback => addFeedbackToList(feedback));
});