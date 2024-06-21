const input = document.getElementById("inputTag");
const imageName = document.getElementById("imageName");
const pngform = document.getElementById("pngform");
const main_div = document.querySelector(".content-con");
const ani_div = document.querySelector(".anim-com");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
const info_div = document.querySelector(".information");
const crop_div_user_con = document.querySelector(".main-crop-user-con");
const img_tag = document.getElementById("image");


let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;
let imgsize = 0;
let imgtype;
let inputImage;
let img_url;

input.addEventListener("change", () => {
  inputImage = document.querySelector("input[type=file]").files[0];
  imgsize = (inputImage.size/1024)/1024;
  imgtype = inputImage.type;
  imageName.innerText = inputImage.name;
  
});

pngform.addEventListener("submit", check);

async function check(e){
    if(imgsize >= 11 || !inputImage || (!imgtype.includes("png") && !imgtype.includes("jpg") && !imgtype.includes("jpeg") && !imgtype.includes("tiff") && !imgtype.includes("svg") && !imgtype.includes("bmp")) ){
      e.preventDefault();
      imageName.innerText = "Wrong File!!";
    }
    else if(!navigator.cookieEnabled){
      e.preventDefault();
      imageName.innerText = "Please Enable Cookie";
    }
    else{
      e.preventDefault();
      first1();
      main_div.style.display = "none";
      const formData = new FormData();
      formData.append("file", inputImage);
      const res = await fetch("/crop-image", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body : formData,
      });

        const data = await res.json();
        console.log(data);
        if(data){
          clearTimeout(tiout1);
          clearTimeout(tiout2);
          clearTimeout(tiout3);
          clearTimeout(tiout4);
          clearTimeout(tiout5);
          clearTimeout(tiout6);
          ani_div.style.display = "none";
          main_div.remove();
          info_div.remove();
          crop_div_user_con.style.display = "block";
          img_tag.src = data.url;
          img_url = data.url;
          changeShape("rectangle");
      }
      }
}


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