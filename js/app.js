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