const input = document.getElementById("inputTag");
const imageName = document.getElementById("imageName");
const pngform = document.getElementById("pngform");
const img_format = document.querySelector(".img-format");
const ani_div = document.querySelector(".anim-com");
const second_con = document.querySelector(".second-con");
const first_con = document.querySelector(".content-con");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;
let imgsize = 0;
let imgtype;
let inputImage;

input.addEventListener("change", () => {
  inputImage = document.querySelector("input[type=file]").files[0];
  imgsize = (inputImage.size/1024)/1024;
  imgtype = inputImage.type;
  // console.log(inputImage);
  imageName.innerText = inputImage.name;
  
});

pngform.addEventListener("submit", check);

async function check(e){
    if(imgsize >= 11 || !inputImage || (!imgtype.includes("png") && !imgtype.includes("jpg") && !imgtype.includes("jpeg") && !imgtype.includes("tiff") && !imgtype.includes("svg") && !imgtype.includes("bmp")) ){
      e.preventDefault();
      imageName.innerText = "Wrong File!!";
    }else{
      e.preventDefault();
      first1();
      first_con.remove();
      const image_type = img_format.value;
      const formData = new FormData();
      formData.append("file", inputImage);
      formData.append("name", image_type);
      const res = await fetch("/convert-image-to-black-and-white", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body : formData,
      });
     
      const data = await res.json();
      if(data){
          clearTimeout(tiout1);
          clearTimeout(tiout2);
          clearTimeout(tiout3);
          clearTimeout(tiout4);
          clearTimeout(tiout5);
          clearTimeout(tiout6);
          ani_div.style.display = "none";
          const h1_tag = document.createElement("h1");
          h1_tag.textContent = "Image Converted to Grayscale Succesfuly";
          second_con.appendChild(h1_tag);
          const a_tag = document.createElement("a");
          a_tag.setAttribute("download", "");
          a_tag.textContent = "Download";
          a_tag.href = data.url;
          second_con.appendChild(a_tag);
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