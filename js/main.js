/* ============================
   OUR CORNERS — Main Script
   Image placeholder fallback only.
   No navigation logic — the page
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

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.photo-container img').forEach(initImage);
});
