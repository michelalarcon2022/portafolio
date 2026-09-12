(function () {

    const sliders = [...document.querySelectorAll('.testimony__body')];
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');

    // 🔒 Guard: si no hay slider en esta página, salir sin errores
    if (sliders.length === 0 || !buttonNext || !buttonBefore) return;

    let value;
    let autoplayInterval;

    const changePosition = (add) => {

        const currentTestimony = document.querySelector('.testimony__body--show').dataset.id;

        value = Number(currentTestimony);
        value += add;

        sliders[Number(currentTestimony) - 1].classList.remove('testimony__body--show');

        if (value === sliders.length + 1 || value === 0) {
            value = value === 0 ? sliders.length : 1;
        }

        sliders[value - 1].classList.add('testimony__body--show');

    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            changePosition(1);
        }, 8000);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        startAutoplay();
    };

    buttonNext.addEventListener('click', () => {
        changePosition(1);
        resetAutoplay();
    });

    buttonBefore.addEventListener('click', () => {
        changePosition(-1);
        resetAutoplay();
    });

    // Arranca autoplay
    startAutoplay();

})();