(function () {

    // =========================================
    // ELEMENTOS DEL MENÚ
    // =========================================

    const openButton = document.querySelector('.nav__menu');
    const menu = document.querySelector('.nav__link--menu');
    const closeMenu = document.querySelector('.nav__close');
    const nav = document.querySelector('.nav');
    const btnUp = document.getElementById('up');

    const menuLinks = document.querySelectorAll('.nav__links');


    // =========================================
    // ABRIR MENÚ
    // =========================================

    if (openButton && menu) {

        openButton.addEventListener('click', () => {

            menu.classList.add('nav__link--show');
            openButton.setAttribute('aria-expanded', 'true');

        });

    }


    // =========================================
    // CERRAR MENÚ CON LA X
    // =========================================

    if (closeMenu && menu) {

        closeMenu.addEventListener('click', () => {

            menu.classList.remove('nav__link--show');

            if (openButton) {
                openButton.setAttribute('aria-expanded', 'false');
            }

        });

    }


    // =========================================
    // CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
    // =========================================

    menuLinks.forEach(link => {

        link.addEventListener('click', () => {

            if (menu) {
                menu.classList.remove('nav__link--show');
            }

            if (openButton) {
                openButton.setAttribute('aria-expanded', 'false');
            }

        });

    });


    // =========================================
    // CERRAR MENÚ CON LA TECLA ESC
    // =========================================

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape' && menu) {

            menu.classList.remove('nav__link--show');

            if (openButton) {
                openButton.setAttribute('aria-expanded', 'false');
            }

        }

    });


    // =========================================
    // EFECTO DEL HEADER AL HACER SCROLL
    // =========================================

    window.addEventListener('scroll', () => {

        if (!nav) return;

        if (window.scrollY > 50) {

            nav.classList.add('nav--scrolled');

        } else {

            nav.classList.remove('nav--scrolled');

        }

    });


    // =========================================
    // BOTÓN VOLVER ARRIBA
    // =========================================

    if (btnUp) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 400) {

                btnUp.classList.remove('hide');

            } else {

                btnUp.classList.add('hide');

            }

        });


        btnUp.addEventListener('click', () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        });

    }


    // =========================================
    // ANIMACIONES REVEAL AL HACER SCROLL
    // =========================================

    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right'
    );

    if (revealElements.length > 0) {

        const revealOnScroll = () => {

            const windowHeight = window.innerHeight;

            revealElements.forEach(el => {

                const elementTop = el.getBoundingClientRect().top;

                if (elementTop < windowHeight - 100) {

                    el.classList.add('show');

                }

            });

        };

        window.addEventListener('scroll', revealOnScroll);

        revealOnScroll(); // Se ejecuta al cargar también

    }


    // =========================================
    // COPIAR CORREO AL PORTAPAPELES
    // =========================================

    const copyEmailBtn = document.getElementById('copyEmail');

    if (copyEmailBtn) {

        copyEmailBtn.addEventListener('click', async () => {

            const email = copyEmailBtn.dataset.email;

            try {

                // Método moderno (requiere https o localhost)
                await navigator.clipboard.writeText(email);

                copyEmailBtn.classList.add('copiado');
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';

                setTimeout(() => {

                    copyEmailBtn.classList.remove('copiado');
                    copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar correo';

                }, 2000);

            } catch (err) {

                // Fallback para navegadores antiguos o file://
                const textarea = document.createElement('textarea');

                textarea.value = email;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                textarea.style.pointerEvents = 'none';

                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();

                try {

                    document.execCommand('copy');

                    copyEmailBtn.classList.add('copiado');
                    copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';

                    setTimeout(() => {

                        copyEmailBtn.classList.remove('copiado');
                        copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar correo';

                    }, 2000);

                } catch (e) {

                    console.error('No se pudo copiar el correo:', e);
                    alert('No se pudo copiar. Mi correo es: ' + email);

                }

                document.body.removeChild(textarea);

            }

        });

    }

})();