/* ============================================
   PORTAFOLIO — SCRIPT COMPLETO
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
        if (!navLinks || !menuOverlay) return;
        navLinks.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!navLinks || !menuOverlay) return;
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
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

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeMenu();
        }
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

                document.querySelectorAll('.faq-item').forEach(function (item) {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });

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
       PORTAFOLIO - LIGHTBOX CON VIDEO
       ============================================ */
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtnLightbox = document.getElementById('lightboxClose');
    const prevBtnLightbox = document.getElementById('lightboxPrev');
    const nextBtnLightbox = document.getElementById('lightboxNext');

    if (lightbox && lightboxContent) {
        let currentItems = [];
        let currentIndex = 0;

        // Abrir lightbox al hacer clic en un item del portafolio
        document.querySelectorAll('.portfolio-item').forEach(function (item) {
            item.addEventListener('click', function (e) {
                // Si el clic fue en el botón de play o en el video, no abrir lightbox
                if (e.target.closest('.play-icon')) return;
                if (e.target.tagName === 'VIDEO') return;

                // Obtener todos los items visibles (según el filtro)
                const visibleItems = document.querySelectorAll('.portfolio-item:not([style*="display: none"])');
                currentItems = Array.from(visibleItems);

                // Encontrar el índice del item clickeado
                currentIndex = currentItems.indexOf(this);

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
                video.style.borderRadius = '12px';
                lightboxContent.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = title;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '90vh';
                img.style.objectFit = 'contain';
                img.style.borderRadius = '12px';
                lightboxContent.appendChild(img);
            }

            if (lightboxCaption) {
                lightboxCaption.textContent = title;
            }
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
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

            if (currentItems[newIndex]) {
                openLightbox(newIndex);
            }
        }

        // Event listeners de la lightbox
        if (closeBtnLightbox) {
            closeBtnLightbox.addEventListener('click', closeLightbox);
        }
        
        if (prevBtnLightbox) {
            prevBtnLightbox.addEventListener('click', function (e) {
                e.stopPropagation();
                navigateLightbox(-1);
            });
        }
        
        if (nextBtnLightbox) {
            nextBtnLightbox.addEventListener('click', function (e) {
                e.stopPropagation();
                navigateLightbox(1);
            });
        }

        // Cerrar con teclas
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });

        // Cerrar al hacer clic fuera del contenido
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

})();