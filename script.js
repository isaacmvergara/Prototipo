/* ============================================
   GABRIELA VERGARA — INTERACCIONES COMPLETAS
   ============================================ */
(function () {
    'use strict';

    const WHATSAPP = '50767558476';
    const EMAIL = 'gabrielavvs@outlook.com';

    /* ============================================
       MODAL DE CONTACTO
       ============================================ */
    const modal = document.getElementById('contactModal');
    const modalServiceName = document.getElementById('modalServiceName');
    const whatsappLink = document.getElementById('whatsappLink');
    const emailLink = document.getElementById('emailLink');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal(consulta) {
        if (!modal) return;
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
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Botones con data-consulta
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

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        });

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        // Cerrar al hacer clic en enlaces
        navLinks.querySelectorAll('a, button').forEach(function (el) {
            el.addEventListener('click', closeMenu);
        });

        // Cerrar al redimensionar a desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 800 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    /* ============================================
       SCROLL SUAVE
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       HEADER CON SOMBRA AL SCROLL
       ============================================ */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    /* ============================================
       ANIMACIONES REVEAL AL SCROLL
       ============================================ */
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

    /* ============================================
       FAQS - ACORDEÓN
       ============================================ */
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length) {
        faqQuestions.forEach(function (question) {
            question.addEventListener('click', function () {
                const faqItem = this.parentElement;

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

})();