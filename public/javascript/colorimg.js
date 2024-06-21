const main_content_con = document.querySelector(".main-content-con");
const colorbtn = document.getElementById("colorbtn");
const honetag = document.getElementById("honetag");
const imgtag = document.getElementById("imgtag");
const img_con = document.querySelector(".main-con");
const ani_div = document.querySelector(".anim-com");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;

colorbtn.addEventListener("click", async () =>{

    first1();
    main_content_con.style.display = "none";
   const resp = await fetch("/color-img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

    const data = await resp.json();

    if(data){
        ani_div.style.display = "";
        main_content_con.style.display = "flex";
        clearTimeout(tiout1);
        clearTimeout(tiout2);
        clearTimeout(tiout3);
        clearTimeout(tiout4);
        clearTimeout(tiout5);
        clearTimeout(tiout6);

        img_con.removeChild(colorbtn);
        honetag.textContent = "Image Colored Sucessfuly";
        imgtag.src = data.url;
        const anchor = document.createElement("a");
        anchor.setAttribute("download","result.jpg");
        anchor.href = data.url;
        anchor.textContent = "Download"
        img_con.appendChild(anchor);
    }
});


function first1(){
    ani_div.style.display = "grid";
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