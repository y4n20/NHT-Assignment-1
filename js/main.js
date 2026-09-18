/* ============================
   OUR CORNERS — Main Script
   Image placeholder fallback, plus
   a scroll-linked floor plan indicator.
   No page navigation logic — the page
   is a single scrollable document.
   ============================ */

function initImage(img) {
    img.addEventListener('load', function () {
        img.parentElement.classList.remove('has-placeholder');
    });

    img.addEventListener('error', function () {
        img.style.display = 'none';
    });

    // Already failed (cached miss)
    if (img.complete && img.naturalWidth === 0) {
        img.style.display = 'none';
    }
}

// Maps a section's data-section value to the floor plan part it highlights.
// Sections not listed here (title, photo-1, photo-2) fall back to the
// default grey state.
var SECTION_HIGHLIGHTS = {
    'photo-3': 'dining',
    'photo-5': 'balcony',
    'photo-7': 'room',
    'photo-9': 'hallway'
};

function initFloorplanScrollspy() {
    var indicator = document.querySelector('.floorplan-indicator');
    var sections = document.querySelectorAll('[data-section]');

    if (!indicator || !sections.length || !('IntersectionObserver' in window)) {
        return;
    }

    // Shrinks the observed viewport to a thin horizontal line at its
    // vertical center, so "in view" means "crossing the center of the
    // screen" — this stays correct even for sections taller than the
    // viewport itself.
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var key = entry.target.getAttribute('data-section');
                indicator.setAttribute('data-highlight', SECTION_HIGHLIGHTS[key] || '');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.photo-container img').forEach(initImage);
    initFloorplanScrollspy();
});
