const ani_div = document.querySelector(".anim-com");
const pngform = document.getElementById("pngform");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;

pngform.addEventListener("submit", () =>{
    
})

function first1(){
    ani_div.style.display = "none";
    tiout1 = setTimeout(() =>{
        first.style.backgroundColor = "#64eded";
        first2();
    }, 200);
}

function first2(){
    tiout2 = setTimeout(()=>{
        second.style.backgroundColor = "transparent";
        second1();
    }, 200);
}

function second1(){
    tiout3 = setTimeout(() =>{
        second.style.backgroundColor = "#f5ee89";
        second2();
    }, 200);

   
}

function second2(){
    tiout4 = setTimeout(()=>{
        first.style.backgroundColor = "transparent";
        third1();
    }, 200);
}

function third1(){
    tiout5 = setTimeout(() =>{
        third.style.backgroundColor = "#797cef";
        third2();
    }, 200);

   
}

function third2(){
    tiout6 = setTimeout(()=>{
        third.style.backgroundColor = "transparent";
        first1();
    }, 200);
}

