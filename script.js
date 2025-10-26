document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll-In Animation (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target); 
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        intersectionObserver.observe(el);
    });


    // --- 2. Abstract Background Parallax Effect ---
    const animatedBg = document.querySelector('.animated-bg');

    // Only add this effect if the element exists and user prefers motion
    if (animatedBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        
        window.addEventListener('mousemove', (e) => {
            // Get mouse position as a value from -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            // Define the maximum movement (in pixels)
            const moveX = x * -15; // Move -15px to 15px
            const moveY = y * -15; // Move -15px to 15px

            // Apply the transform
            // Using requestAnimationFrame for better performance
            window.requestAnimationFrame(() => {
                animatedBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

}); // <-- This is the end of the script.js file
