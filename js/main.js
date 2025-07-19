// --- HolyCow main.js ---
// Smooth fade/slide-in animations on scroll

function handleScrollAnimation() {
  const targets = document.querySelectorAll('.animate-on-scroll');
  targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      target.classList.add('active');
    }
  });
}

// Trigger on scroll and initial load
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// 💡 Future enhancements can go below!
// Example:
// setupNavigation();
// loadTestimonials();
// etc.


function updateParallax() {
  document.querySelectorAll('.parallax').forEach(el => {
    const offset = window.pageYOffset;
    const scrollSpeed = 0.5; // adjust for desired smoothness
    const imageOffset = -offset * scrollSpeed; // scroll upward from bottom
    el.style.backgroundPositionY = `${imageOffset}px`;
  });
}

// window.addEventListener('load', updateParallax);

window.addEventListener('scroll', updateParallax);
