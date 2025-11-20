document.addEventListener('DOMContentLoaded', () => {
    // Select all carousel wrappers
    const wrappers = document.querySelectorAll('.creation-slider-wrapper');

    wrappers.forEach(wrapper => {
        const sliderContent = wrapper.querySelector('.slider-content');
        const prevBtn = wrapper.querySelector('.prev-btn');
        const nextBtn = wrapper.querySelector('.next-btn');
        const indicatorDots = wrapper.querySelector('.indicator-dots');
        const cardCount = sliderContent.children.length; // Should be 5

        let currentCardIndex = 0; // The index of the first visible card (1-based for user)

        // --- 1. Indicator Setup ---
        function createIndicators() {
            indicatorDots.innerHTML = '';
            for (let i = 0; i < cardCount; i++) {
                const dot = document.createElement('span');
                dot.classList.add('indicator-dot');
                dot.textContent = i + 1; // Use numbers 1-5
                dot.setAttribute('data-index', i);

                // Add click listener to jump to card
                dot.addEventListener('click', () => {
                    currentCardIndex = i;
                    updateSlider();
                });
                indicatorDots.appendChild(dot);
            }
        }

        // --- 2. Movement Logic ---
        function updateSlider() {
            // Calculate the width of one card (plus its margin/gap)
            // On desktop, this is one card width. On mobile, this will be 100% of the slider-wrapper width.
            const cardWidth = sliderContent.children[0].offsetWidth + 30; // 30px is the gap/margin

            // Calculate the scroll position
            // Since we only show one card at a time on mobile, the distance is simply the index * cardWidth
            const scrollDistance = currentCardIndex * cardWidth;
            
            sliderContent.scrollTo({
                left: scrollDistance,
                behavior: 'smooth'
            });

            // Update indicators and button state
            updateIndicators();
            updateButtonState();
        }

        function updateIndicators() {
            const dots = indicatorDots.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentCardIndex);
            });
        }

        function updateButtonState() {
            // Disable buttons at start/end
            prevBtn.disabled = currentCardIndex === 0;
            nextBtn.disabled = currentCardIndex === cardCount - 1;
            prevBtn.classList.toggle('disabled', prevBtn.disabled);
            nextBtn.classList.toggle('disabled', nextBtn.disabled);
        }


        // --- 3. Event Listeners ---

        prevBtn.addEventListener('click', () => {
            if (currentCardIndex > 0) {
                currentCardIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentCardIndex < cardCount - 1) {
                currentCardIndex++;
                updateSlider();
            }
        });

        // Initialize
        createIndicators();
        updateSlider(); // Set initial position and state
        
        // Recalculate positions on window resize to ensure responsiveness works
        window.addEventListener('resize', () => {
             // Reset to card 1 on resize for consistency
             currentCardIndex = 0; 
             updateSlider();
        });
    });
});
