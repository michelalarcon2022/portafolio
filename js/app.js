const $btnUp = document.getElementById("up");

window.addEventListener("scroll", (e) => {
    let y = document.documentElement.scrollTop;
    if (y === 0) {
        $btnUp.classList.add("hide");
        $btnUp.classList.remove("active");
    } else if (y >= 300) {
        $btnUp.classList.add("active");
        $btnUp.classList.remove("hide");
    }
});

document.addEventListener("click", (e) => {
    if (e.target === $btnUp || e.target.matches(".fa-arrow-up")) {
        window.scrollTo({
            behavior: "smooth",
            top: 0,
        });
    }
});

// =========================================
// ANIMACIONES AL HACER SCROLL
// =========================================

const elementosAnimados = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
);

const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('show');
            observer.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
});

// =========================================
// LÍNEA DE TIEMPO INTERACTIVA
// =========================================

const etapas = [
    {
        id: 1,
        edad: "15 años",
        icono: "./images/construccion.svg",
        titulo: "T.E. a los 15 años",
        texto: "Soñaba con diseñar edificios, casas o puentes, ser un gran ingeniero o arquitecto. Llegué a hacer un proyecto de un Gym, lastimosamente se quedó en bosquejo y exposiciones de momento.",
        color: "#e74c3c"
    },
    {
        id: 2,
        edad: "20 años",
        icono: "./images/estudiar.svg",
        titulo: "T.E. a los 20 años",
        texto: "Ya siendo más consciente de todo y afrontando la realidad personal, encontré una oportunidad inmensa de ingresar al SENA, donde me formé como Tecnólogo en Mantenimiento de Equipos de Cómputo y Networking.",
        color: "#3498db"
    },
    {
        id: 3,
        edad: "25 años",
        icono: "./images/java.svg",
        titulo: "T.E. a los 25 años",
        texto: "Actualmente estudio Ingeniería en Sistemas en la Universidad CORHUILA de Neiva. Pienso subir de nivel estudiando programación, diseño o haciendo prácticas en Machine Learning e I.A.",
        color: "#9b59b6"
    },
    {
        id: 4,
        edad: "29 años (Hoy)",
        icono: "./images/java.svg",
        titulo: "T.E. a los 29 años",
        texto: "Integro mi experiencia técnica con la ingeniería y la IA. Enfocado en aplicar todo mi conocimiento en proyectos reales, mientras profundizo en Python.",
        color: "#e67e22"
    }
];

const timelineNav = document.getElementById("timelineNav");
const timelineCard = document.getElementById("timelineCard");

if (timelineNav && timelineCard) {

    etapas.forEach((etapa, index) => {
        const boton = document.createElement("button");
        boton.classList.add("timeline__btn");
        boton.textContent = etapa.edad;
        boton.dataset.index = index;
        boton.addEventListener("click", () => activarEtapa(index));
        timelineNav.appendChild(boton);
    });

    function activarEtapa(index) {
        const etapaActiva = etapas[index];
        const botones = timelineNav.querySelectorAll(".timeline__btn");

        botones.forEach((btn, i) => {
            if (i === index) {
                btn.style.backgroundColor = etapaActiva.color;
                btn.style.color = "#fff";
            } else {
                btn.style.backgroundColor = "#eee";
                btn.style.color = "#333";
            }
        });

        timelineCard.style.opacity = 0;

        setTimeout(() => {
            timelineCard.innerHTML = `
                <img src="${etapaActiva.icono}" alt="${etapaActiva.titulo}" class="timeline__icon">
                <h3 class="timeline__title" style="color: ${etapaActiva.color};">
                    ${etapaActiva.titulo}
                </h3>
                <p class="timeline__text">${etapaActiva.texto}</p>
            `;
            timelineCard.style.borderTop = `5px solid ${etapaActiva.color}`;
            timelineCard.style.opacity = 1;
        }, 200);
    }

    activarEtapa(0);
}

// =========================================
// PASATIEMPOS — CARRUSEL INFINITO
// =========================================

const hobbiesTrack = document.getElementById("hobbiesTrack");
const hobbiesPrev = document.getElementById("hobbiesPrev");
const hobbiesNext = document.getElementById("hobbiesNext");
const hobbiesDots = document.getElementById("hobbiesDots");

if (hobbiesTrack && hobbiesPrev && hobbiesNext) {

    const cardsOriginales = [...hobbiesTrack.querySelectorAll(".hobby-card")];
    const totalOriginales = cardsOriginales.length;

    // Clonar la primera tarjeta al final
    const primeraClon = cardsOriginales[0].cloneNode(true);
    primeraClon.classList.add("clon");
    primeraClon.setAttribute("aria-hidden", "true");
    hobbiesTrack.appendChild(primeraClon);

    const todasLasCards = [...hobbiesTrack.querySelectorAll(".hobby-card")];

    // Crear los puntitos
    if (hobbiesDots) {
        for (let i = 0; i < totalOriginales; i++) {
            const dot = document.createElement("button");
            dot.classList.add("hobbies__dot");
            dot.setAttribute("aria-label", `Ir a tarjeta ${i + 1}`);
            if (i === 0) dot.classList.add("activo");

            dot.addEventListener("click", () => {
                scrollToCard(i);
                pausarYReanudar();
            });

            hobbiesDots.appendChild(dot);
        }
    }

    const dots = hobbiesDots ? [...hobbiesDots.querySelectorAll(".hobbies__dot")] : [];

    // =========================================
    // SCROLL HORIZONTAL PURO (NO MUEVE LA PÁGINA)
    // =========================================
    function scrollToCard(index) {
        if (index < 0) index = totalOriginales - 1;
        if (index >= totalOriginales) index = totalOriginales;

        const card = todasLasCards[index];
        // Calculamos la posición horizontal necesaria para centrar la tarjeta
        const targetScroll = card.offsetLeft - (hobbiesTrack.clientWidth - card.offsetWidth) / 2;

        hobbiesTrack.scrollTo({
            left: targetScroll,
            behavior: "smooth"
        });
    }

    // Detectar tarjeta activa
    function getCardActiva() {
        const trackCenter = hobbiesTrack.scrollLeft + hobbiesTrack.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        todasLasCards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - trackCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        return closestIndex >= totalOriginales ? 0 : closestIndex;
    }

    function actualizarPuntoActivo() {
        const activo = getCardActiva();

        dots.forEach((dot, i) => {
            dot.classList.toggle("activo", i === activo);
        });
    }

    hobbiesTrack.addEventListener("scroll", actualizarPuntoActivo);
    window.addEventListener("resize", actualizarPuntoActivo);
    setTimeout(actualizarPuntoActivo, 100);

    // Salto invisible al llegar al clon
    hobbiesTrack.addEventListener("scroll", () => {
        if (hobbiesTrack.dataset.saltando === "true") return;

        const maxScroll = hobbiesTrack.scrollWidth - hobbiesTrack.clientWidth;
        const scrollActual = hobbiesTrack.scrollLeft;

        if (scrollActual >= maxScroll - 5) {
            setTimeout(() => {
                hobbiesTrack.style.scrollBehavior = "auto";
                hobbiesTrack.scrollLeft = 0;
                setTimeout(() => {
                    hobbiesTrack.style.scrollBehavior = "";
                }, 50);
            }, 500);
        }
    });

    // Flecha siguiente
    hobbiesNext.addEventListener("click", () => {
        const actual = getCardActiva();
        scrollToCard(actual + 1);
        pausarYReanudar();
    });

    // Flecha anterior (con salto al final)
    hobbiesPrev.addEventListener("click", () => {
        const actual = getCardActiva();

        if (actual === 0 && hobbiesTrack.scrollLeft <= 5) {
            hobbiesTrack.dataset.saltando = "true";

            hobbiesTrack.style.scrollBehavior = "auto";
            hobbiesTrack.scrollLeft = hobbiesTrack.scrollWidth;

            requestAnimationFrame(() => {
                hobbiesTrack.style.scrollBehavior = "";
                scrollToCard(totalOriginales - 1);

                setTimeout(() => {
                    hobbiesTrack.dataset.saltando = "false";
                }, 600);

                pausarYReanudar();
            });

        } else {
            scrollToCard(actual - 1);
            pausarYReanudar();
        }
    });

    // Autoplay
    let isPaused = false;

    function iniciarAutoplay() {
        setInterval(() => {
            if (!isPaused) {
                const actual = getCardActiva();
                scrollToCard(actual + 1);
            }
        }, 4500);
    }

    function pausarAutoplay() { isPaused = true; }
    function reanudarAutoplay() { isPaused = false; }

    function pausarYReanudar() {
        pausarAutoplay();
        clearTimeout(window.__hobbiesResume);
        window.__hobbiesResume = setTimeout(reanudarAutoplay, 6000);
    }

    hobbiesTrack.addEventListener("mouseenter", pausarAutoplay);
    hobbiesTrack.addEventListener("mouseleave", reanudarAutoplay);

    document.addEventListener("visibilitychange", () => {
        isPaused = document.hidden;
    });

    // Arrastrar con el mouse
    let isDown = false;
    let startX;
    let scrollStart;

    hobbiesTrack.addEventListener("mousedown", (e) => {
        isDown = true;
        hobbiesTrack.classList.add("arrastrando");
        startX = e.pageX - hobbiesTrack.offsetLeft;
        scrollStart = hobbiesTrack.scrollLeft;
        pausarAutoplay();
    });

    hobbiesTrack.addEventListener("mouseleave", () => {
        isDown = false;
        hobbiesTrack.classList.remove("arrastrando");
    });

    hobbiesTrack.addEventListener("mouseup", () => {
        isDown = false;
        hobbiesTrack.classList.remove("arrastrando");
        pausarYReanudar();
    });

    hobbiesTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - hobbiesTrack.offsetLeft;
        const walk = (x - startX) * 1.5;
        hobbiesTrack.scrollLeft = scrollStart - walk;
    });

    iniciarAutoplay();
}