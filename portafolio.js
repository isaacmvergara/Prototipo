/* ============================================
   PORTAFOLIO — FILTROS Y LIGHTBOX (CON VIDEO)
   ============================================ */
(function () {
    'use strict';

    /* ---------- FILTROS ---------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = Array.from(document.querySelectorAll('.portfolio-item'));

    function applyFilter(filter) {
        items.forEach(function (item) {
            const match = filter === 'all' || item.getAttribute('data-category') === filter;
            item.style.display = match ? 'block' : 'none';
        });
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    /* ---------- LIGHTBOX CON VIDEO ---------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let gallery = [];
    let index = 0;

    function render() {
        const current = gallery[index];
        if (!current) return;
        
        // Limpiar contenido anterior
        lightboxMedia.innerHTML = '';
        
        if (current.type === 'video') {
            const video = document.createElement('video');
            video.src = current.src;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '90vw';
            video.style.maxHeight = '80vh';
            video.style.borderRadius = '16px';
            lightboxMedia.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = current.src;
            img.alt = current.title;
            lightboxMedia.appendChild(img);
        }
        
        lightboxCaption.textContent = current.title;
    }

    function open(startIndex, collection) {
        gallery = collection;
        index = startIndex;
        render();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxMedia.innerHTML = '';
    }

    function next() { if (gallery.length) { index = (index + 1) % gallery.length; render(); } }
    function prev() { if (gallery.length) { index = (index - 1 + gallery.length) % gallery.length; render(); } }

    items.forEach(function (item) {
        item.addEventListener('click', function () {
            const visible = items.filter(function (el) { return el.style.display !== 'none'; });
            const collection = visible.map(function (el) {
                return {
                    src: el.getAttribute('data-src'),
                    title: el.getAttribute('data-title') || 'Proyecto',
                    type: el.getAttribute('data-type') || 'image'
                };
            });
            const startIndex = visible.indexOf(item);
            if (startIndex !== -1) open(startIndex, collection);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });
    if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });
})();