(function(){
    const titleQuestions = [...document.querySelectorAll('.questions__title')];
    console.log(titleQuestions)

    titleQuestions.forEach(question =>{
        question.addEventListener('click', ()=>{
            let height = 0;
            let answer = question.nextElementSibling;
            let addPadding = question.parentElement.parentElement;

            addPadding.classList.toggle('questions__padding--add');
            question.children[0].classList.toggle('questions__arrow--rotate');

            if(answer.clientHeight === 0){
                height = answer.scrollHeight;
            }

            answer.style.height = `${height}px`;
        });
    });
})

const $btnUp= document.getElementById("up");
window.addEventListener("scroll",(e)=>{
    let y = document.documentElement.scrollTop;
    if(y === 0){
        $btnUp.classList.add("hide");
        $btnUp.classList.remove("active");

    }else if(y >=1000){
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