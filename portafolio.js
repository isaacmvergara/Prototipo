/* ============================================
   GABRIELA VERGARA — SCRIPT COMPLETO
   ============================================ */

(function () {
    'use strict';

    const WHATSAPP = '50767558476';
    const EMAIL = 'gabrielavvs@outlook.com';

    /* ============================================
       MENÚ MÓVIL
       ============================================ */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        navLinks.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    if (navLinks) {
        navLinks.querySelectorAll('a, button').forEach(function (el) {
            el.addEventListener('click', closeMenu);
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 800) closeMenu();
    });

    /* ============================================
       MODAL DE CONTACTO
       ============================================ */
    const modal = document.getElementById('contactModal');
    const modalServiceName = document.getElementById('modalServiceName');
    const whatsappLink = document.getElementById('whatsappLink');
    const emailLink = document.getElementById('emailLink');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal(consulta) {
        if (modalServiceName) {
            modalServiceName.textContent = '"' + consulta + '"';
        }
        const waMsg = encodeURIComponent('Hola, me interesa colaborar con su agencia: "' + consulta + '". Me gustaría recibir más información. Gracias.');
        if (whatsappLink) {
            whatsappLink.href = 'https://wa.me/' + WHATSAPP + '?text=' + waMsg;
        }
        const subject = encodeURIComponent('Consulta: ' + consulta);
        const body = encodeURIComponent('Hola,\n\nMe interesa "' + consulta + '". Por favor, envíenme más detalles.\n\nSaludos.');
        if (emailLink) {
            emailLink.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
        }
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Cualquier botón con data-consulta abre el modal
    document.querySelectorAll('[data-consulta]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            openModal(this.getAttribute('data-consulta'));
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    /* ============================================
       SCROLL SUAVE
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       HEADER CON SOMBRA AL HACER SCROLL
       ============================================ */
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    });

    /* ============================================
       ANIMACIONES REVEAL AL SCROLL
       ============================================ */
    var observer = new IntersectionObserver(function (entries) {
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

    /* ============================================
       FAQS - ACORDEÓN
       ============================================ */
    var faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length) {
        faqQuestions.forEach(function (question) {
            question.addEventListener('click', function () {
                var faqItem = this.parentElement;

                // Cerrar otros items abiertos
                document.querySelectorAll('.faq-item').forEach(function (item) {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });

                // Toggle el item actual
                faqItem.classList.toggle('active');
            });
        });
    }

    /* ============================================
       PORTAFOLIO — FILTROS
       ============================================ */
    var filterBtns = document.querySelectorAll('.filter-btn');
    var items = Array.from(document.querySelectorAll('.portfolio-item'));

    function applyFilter(filter) {
        items.forEach(function (item) {
            var match = filter === 'all' || item.getAttribute('data-category') === filter;
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

    /* ============================================
       PORTAFOLIO — LIGHTBOX CON VIDEO
       ============================================ */
    var lightbox = document.getElementById('lightbox');
    var lightboxMedia = document.getElementById('lightboxMedia');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var closeBtnLightbox = document.getElementById('lightboxClose');
    var prevBtnLightbox = document.getElementById('lightboxPrev');
    var nextBtnLightbox = document.getElementById('lightboxNext');

    var gallery = [];
    var index = 0;

    function renderLightbox() {
        var current = gallery[index];
        if (!current) return;

        // Limpiar contenido anterior
        lightboxMedia.innerHTML = '';

        if (current.type === 'video') {
            var video = document.createElement('video');
            video.src = current.src;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '90vw';
            video.style.maxHeight = '80vh';
            video.style.borderRadius = '16px';
            lightboxMedia.appendChild(video);
        } else {
            var img = document.createElement('img');
            img.src = current.src;
            img.alt = current.title;
            img.style.maxWidth = '90vw';
            img.style.maxHeight = '80vh';
            img.style.borderRadius = '16px';
            img.style.objectFit = 'contain';
            lightboxMedia.appendChild(img);
        }

        lightboxCaption.textContent = current.title;
    }

    function openLightbox(startIndex, collection) {
        gallery = collection;
        index = startIndex;
        renderLightbox();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxMedia.innerHTML = '';
    }

    function nextLightbox() {
        if (gallery.length) {
            index = (index + 1) % gallery.length;
            renderLightbox();
        }
    }

    function prevLightbox() {
        if (gallery.length) {
            index = (index - 1 + gallery.length) % gallery.length;
            renderLightbox();
        }
    }

    // Evento de clic en items del portafolio
    items.forEach(function (item) {
        item.addEventListener('click', function () {
            // Si el clic fue en el botón de play o en el video, no abrir lightbox
            if (event.target.closest('.play-icon')) return;
            if (event.target.tagName === 'VIDEO') return;

            var visible = items.filter(function (el) {
                return el.style.display !== 'none';
            });

            var collection = visible.map(function (el) {
                return {
                    src: el.getAttribute('data-src'),
                    title: el.getAttribute('data-title') || 'Proyecto',
                    type: el.getAttribute('data-type') || 'image'
                };
            });

            var startIndex = visible.indexOf(item);
            if (startIndex !== -1) openLightbox(startIndex, collection);
        });
    });

    if (closeBtnLightbox) {
        closeBtnLightbox.addEventListener('click', closeLightbox);
    }

    if (prevBtnLightbox) {
        prevBtnLightbox.addEventListener('click', function (e) {
            e.stopPropagation();
            prevLightbox();
        });
    }

    if (nextBtnLightbox) {
        nextBtnLightbox.addEventListener('click', function (e) {
            e.stopPropagation();
            nextLightbox();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
    });

})();