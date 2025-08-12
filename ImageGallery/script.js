

        // Gallery interaction functionality
        const galleryItems = document.querySelectorAll('.gallery-item');
        const overlay = document.querySelector('.overlay');
        const closeButton = document.querySelector('.close-button');

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(item);
            });

            // Add staggered loading animation
            item.style.animationDelay = `${index * 0.2}s`;
        });

        function openLightbox(item) {
            item.classList.add('active');
            overlay.classList.add('active');
            closeButton.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const activeItem = document.querySelector('.gallery-item.active');
            if (activeItem) {
                activeItem.classList.remove('active');
            }
            overlay.classList.remove('active');
            closeButton.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        closeButton.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        // Random featured item change
        setInterval(() => {
            const currentFeatured = document.querySelector('.gallery-item.featured');
            const randomItem = galleryItems[Math.floor(Math.random() * galleryItems.length)];
            
            currentFeatured.classList.remove('featured');
            randomItem.classList.add('featured');
        }, 10000);

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        galleryItems.forEach(item => {
            observer.observe(item);
        });

        // Touch support for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', e => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndY < touchStartY - 50) {
                // Swipe up - could add functionality
            }
            if (touchEndY > touchStartY + 50) {
                // Swipe down - close lightbox
                closeLightbox();
            }
        }
    