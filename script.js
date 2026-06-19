/* ============================================
   GABRIELA VERGARA — INTERACCIONES
   ============================================ */
(function () {
    'use strict';

    const WHATSAPP = '50767558476';
    const EMAIL = 'gabrielavvs@outlook.com';

    /* ---------- MODAL DE CONTACTO ---------- */
    const modal = document.getElementById('contactModal');
    const modalServiceName = document.getElementById('modalServiceName');
    const whatsappLink = document.getElementById('whatsappLink');
    const emailLink = document.getElementById('emailLink');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal(consulta) {
        modalServiceName.textContent = '"' + consulta + '"';
        const waMsg = encodeURIComponent('Hola, me interesa colaborar con su agencia: "' + consulta + '". Me gustaría recibir más información. Gracias.');
        whatsappLink.href = 'https://wa.me/' + WHATSAPP + '?text=' + waMsg;
        const subject = encodeURIComponent('Consulta: ' + consulta);
        const body = encodeURIComponent('Hola,\n\nMe interesa "' + consulta + '". Por favor, envíenme más detalles.\n\nSaludos.');
        emailLink.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Cualquier botón con data-consulta abre el modal
    document.querySelectorAll('[data-consulta]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            openModal(this.getAttribute('data-consulta'));
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    /* ---------- MENÚ MÓVIL ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() { navLinks.classList.add('active'); menuOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { navLinks.classList.remove('active'); menuOverlay.classList.remove('active'); document.body.style.overflow = ''; }

    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });
    menuOverlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a, button').forEach(function (el) { el.addEventListener('click', closeMenu); });
    window.addEventListener('resize', function () { if (window.innerWidth > 800) closeMenu(); });

    /* ---------- SCROLL SUAVE ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    /* ---------- HEADER CON SOMBRA AL HACER SCROLL ---------- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });

    /* ---------- ANIMACIONES REVEAL AL SCROLL ---------- */
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = (i % 4 * 0.08) + 's';
        observer.observe(el);
    });
    
})();

/* ============================================
   FAQS - ACORDEÓN
   ============================================ */
(function () {
    'use strict';

    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                
                // Cerrar otros items abiertos
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle el item actual
                faqItem.classList.toggle('active');
            });
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxContent = document.getElementById('lightboxContent');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        
        let currentItems = [];
        let currentIndex = 0;

        // Abrir lightbox al hacer clic en un item del portafolio
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.addEventListener('click', function(e) {
                // Si el clic fue en el botón de play o en el video, no abrir lightbox
                if (e.target.closest('.play-icon')) return;
                if (e.target.tagName === 'VIDEO') return;
                
                // Obtener todos los items visibles (según el filtro)
                const visibleItems = document.querySelectorAll('.portfolio-item:not([style*="display: none"])');
                currentItems = Array.from(visibleItems);
                
                // Encontrar el índice del item clickeado
                currentIndex = currentItems.indexOf(item);
                
                if (currentIndex === -1) currentIndex = 0;
                
                openLightbox(currentIndex);
            });
        });

        function openLightbox(index) {
            const item = currentItems[index];
            if (!item) return;
            
            const src = item.dataset.src;
            const title = item.dataset.title || 'Sin título';
            const type = item.dataset.type || 'imagen';
            
            // Limpiar contenido anterior
            lightboxContent.innerHTML = '';
            
            // Crear el elemento según el tipo
            if (type === 'video') {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.autoplay = true;
                video.style.maxWidth = '100%';
                video.style.maxHeight = '90vh';
                lightboxContent.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = title;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '90vh';
                img.style.objectFit = 'contain';
                lightboxContent.appendChild(img);
            }
            
            lightboxCaption.textContent = title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Actualizar índice
            currentIndex = index;
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            // Pausar videos si hay
            const video = lightboxContent.querySelector('video');
            if (video) {
                video.pause();
            }
        }

        function navigateLightbox(direction) {
            if (currentItems.length === 0) return;
            
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = currentItems.length - 1;
            if (newIndex >= currentItems.length) newIndex = 0;
            
            // Verificar que el item existe y está visible
            if (currentItems[newIndex]) {
                openLightbox(newIndex);
            }
        }

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', () => navigateLightbox(-1));
        nextBtn.addEventListener('click', () => navigateLightbox(1));
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });
        
        // Cerrar al hacer clic fuera del contenido
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
    
})();