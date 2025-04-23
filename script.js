document.addEventListener('DOMContentLoaded', function() {
    const updateLoginUI = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const loginButtons = document.querySelector('.login-buttons');
        const userProfile = document.querySelector('.user-profile');
        
        if (user.isLoggedIn) {
            if (loginButtons) {
                loginButtons.style.display = 'none';
                const navList = document.querySelector('.nav-list');
                const userProfileHTML = `
                    <div class="user-profile">
                        <span class="user-name">👤 ${user.nombre}</span>
                        <button class="logout-btn">Cerrar sesión</button>
                    </div>
                `;
                navList.insertAdjacentHTML('beforeend', userProfileHTML);
                
                document.querySelector('.logout-btn').addEventListener('click', () => {
                    localStorage.removeItem('user');
                    location.reload();
                });
            }
        } else {
            if (loginButtons) {
                loginButtons.style.display = 'flex';
            }
            if (userProfile) {
                userProfile.remove();
            }
        }
    };

    updateLoginUI();


    const loginBtn = document.querySelector('.submenu-login-btn');
    const registerBtn = document.querySelector('.submenu-registration-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = 'registration.html';
        });
    }

    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel && slides.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 33.333}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateCarousel();
        }
        
        if (prevButton && nextButton) {
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateCarousel();
                });
            });
            
            setInterval(nextSlide, 5000);
        }
    }

    const showcaseTrack = document.querySelector('.carousel-container2 .carousel-track');
    const showcaseSlides = document.querySelectorAll('.carousel-container2 .carousel-slide2');
    const showcaseNext = document.querySelector('.next2');
    const showcasePrev = document.querySelector('.prev2');
    const showcaseDotsContainer = document.querySelector('.carousel-dots2');

    if (showcaseTrack && showcaseSlides.length > 0) {
        let currentShowcaseIndex = 0;

        showcaseSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToShowcaseSlide(index));
            showcaseDotsContainer.appendChild(dot);
        });

        const showcaseDots = document.querySelectorAll('.carousel-dots2 .dot');

        function updateShowcaseDots() {
            showcaseDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentShowcaseIndex);
            });
        }

        function goToShowcaseSlide(index) {
            currentShowcaseIndex = index;
            showcaseTrack.style.transform = `translateX(-${currentShowcaseIndex * 100}%)`;
            updateShowcaseDots();
        }

        function nextShowcaseSlide() {
            currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseSlides.length;
            goToShowcaseSlide(currentShowcaseIndex);
        }

        function prevShowcaseSlide() {
            currentShowcaseIndex = (currentShowcaseIndex - 1 + showcaseSlides.length) % showcaseSlides.length;
            goToShowcaseSlide(currentShowcaseIndex);
        }

        if (showcaseNext) showcaseNext.addEventListener('click', nextShowcaseSlide);
        if (showcasePrev) showcasePrev.addEventListener('click', prevShowcaseSlide);

        setInterval(nextShowcaseSlide, 9000);
    }
});