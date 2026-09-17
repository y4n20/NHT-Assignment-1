/* ============================
   OUR CORNERS — Main Script
   ============================ */

// ─── Room Data ───────────────────────────────────────────
const rooms = {
    dad: {
        name: 'Dad',
        space: 'Balcony',
        photos: [
            {
                src: 'images/photo-5.jpg',
                label: 'Present',
                alt: 'Father cleaning and maintaining his aquarium at the balcony area',
                placeholder: 'Photo 5 — Father / Present'
            },
            {
                src: 'images/photo-6.jpg',
                label: 'His Space',
                alt: 'The balcony area without father — aquariums, tools and equipment remain',
                placeholder: 'Photo 6 — Father\'s Space / Trace'
            }
        ],
        caption: 'My father’s corner is shaped by his aquariums, tools and the routine of maintaining them.'
    },

    mom: {
        name: 'Mom',
        space: 'Dining Area',
        photos: [
            {
                src: 'images/photo-3.jpg',
                label: 'Present',
                alt: 'Mother at the dining area doing arts and crafts',
                placeholder: 'Photo 3 — Mother / Present'
            },
            {
                src: 'images/photo-4.jpg',
                label: 'Her Space',
                alt: 'The dining area without mother — her arts-and-crafts materials remain',
                placeholder: 'Photo 4 — Mother\'s Space / Trace'
            }
        ],
        caption: 'The dining table has become my mother’s workspace for arts and crafts. Even when she isn’t there, the things she leaves behind make the space recognisably hers.'
    },

    me: {
        name: 'Me',
        space: 'Bedroom',
        photos: [
            {
                src: 'images/photo-7.jpg',
                label: 'Present',
                alt: 'Me at my aquarium feeding the fish',
                placeholder: 'Photo 7 — Me / Present'
            },
            {
                src: 'images/photo-8.jpg',
                label: 'My Space',
                alt: 'My bedroom without me — aquarium, desk and personal objects remain',
                placeholder: 'Photo 8 — My Space / Trace'
            }
        ],
        caption: 'My room is both a personal space and a place shaped by my relationship with the aquarium.'
    },

    sister: {
        name: 'Sister',
        space: 'Hallway',
        isTemporal: true,
        photos: [
            {
                src: 'images/photo-2.jpg',
                label: 'Then',
                alt: 'Sister standing in the hallway of the family home — an older photograph',
                placeholder: 'Photo 2 — Sister / Past'
            },
            {
                src: 'images/photo-9.jpg',
                label: 'Now',
                alt: 'Sister\'s aquarium alone in the same hallway — present day',
                placeholder: 'Photo 9 — Sister\'s Aquarium / Present'
            }
        ],
        caption: 'She no longer lives here. The space remains.'
    }
};


// ─── Screen Navigation ───────────────────────────────────
function showScreen(id) {
    const current = document.querySelector('.screen.active');
    if (current) {
        current.classList.remove('active');
    }

    const next = document.getElementById(id);
    next.classList.add('active');
    window.scrollTo(0, 0);
}


// ─── Render Room View ────────────────────────────────────
function renderRoom(roomKey) {
    const room = rooms[roomKey];
    const container = document.getElementById('room-content');

    let html = '';

    // Header
    html += `
        <div class="room-header">
            <h2>${room.name}</h2>
            <p class="room-header-space">${room.space}</p>
        </div>
    `;

    // Photos
    room.photos.forEach(function (photo, i) {
        // Sister gets prominent "then / now" labels
        if (room.isTemporal) {
            html += `<p class="temporal-label">${photo.label}</p>`;
        }

        html += `
            <figure class="room-photo">
                <div class="photo-container has-placeholder"
                     data-placeholder="${photo.placeholder}">
                    <img src="${photo.src}"
                         alt="${photo.alt}"
                         loading="lazy">
                </div>
                ${!room.isTemporal
                    ? '<figcaption class="photo-label">' + photo.label + '</figcaption>'
                    : ''}
            </figure>
        `;

        // Divider between the two photos
        if (i === 0) {
            html += '<hr class="room-divider">';
        }
    });

    // Caption
    html += `<p class="room-caption">${room.caption}</p>`;

    container.innerHTML = html;

    // Handle image load / error for placeholders
    container.querySelectorAll('.photo-container img').forEach(initImage);
}


// ─── Image Placeholder Handling ──────────────────────────
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


// ─── Init ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    // Entry screen -> Floor Plan
    document.getElementById('enter-home').addEventListener('click', function () {
        showScreen('screen-floorplan');
    });

    // Floor Plan rooms -> Room View
    document.querySelectorAll('.room').forEach(function (room) {
        room.addEventListener('click', function () {
            var roomKey = room.getAttribute('data-room');
            renderRoom(roomKey);
            showScreen('screen-room');
        });
    });

    // Room View -> back to Floor Plan
    document.getElementById('back-btn').addEventListener('click', function () {
        showScreen('screen-floorplan');
    });

    // Handle entry-screen image placeholder
    document.querySelectorAll('#screen-entry .photo-container img').forEach(initImage);
});
