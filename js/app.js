const $btnUp= document.getElementById("up");
window.addEventListener("scroll",(e)=>{
    let y = document.documentElement.scrollTop;
    if(y === 0){
        $btnUp.classList.add("hide");
        $btnUp.classList.remove("active");

    }else if(y >=300){
        $btnUp.classList.add("active");
        $btnUp.classList.remove("hide");

    }
});
document.addEventListener("click", (e)=>{
    if(e.target === $btnUp || e.target.matches(".fa-arrow-up")){
        //alert("Hola desde JS");
        window.scrollTo({
            behavior:"smooth",
            top:0,
        })
    }
})

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

            // Deja de observarlo después de mostrarlo
            observer.unobserve(entrada.target);
        }

    });

}, {
    threshold: 0.15
});

elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
});