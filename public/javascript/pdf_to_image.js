const input = document.getElementById("inputTag");
const imageName = document.getElementById("imageName");
const pngform = document.getElementById("pngform");
const main_div = document.querySelector(".content-con");
const ani_div = document.querySelector(".anim-com");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;

let validate;

input.addEventListener("change", () => {
  inputImage = document.querySelector("input[type=file]").files[0];
  const imgsize = inputImage.size / 1024 / 1024;
  const imgtype = inputImage.type;
  const nam = inputImage.name;

  if (!(imgsize <= 50 && imgtype.includes("pdf"))) 
  {
    validate = false;
    imageName.innerText = `Wrong File Selected`;
  } 
  else {
    validate = true;
    imageName.innerText = nam;
  } 
});

pngform.addEventListener("submit", check);

function check(e) {
  if (!validate) e.preventDefault();
  else if (!navigator.cookieEnabled) {
    e.preventDefault();
    imageName.innerText = "Please Enable Cookie";
  } 
  else {
    first1();
    main_div.style.display = "none";
  }
}

function first1() {
  ani_div.style.display = "grid";
  tiout1 = setTimeout(() => {
    first.style.backgroundColor = "#64eded";
    first2();
  }, 200);
}

function first2() {
  tiout2 = setTimeout(() => {
    second.style.backgroundColor = "transparent";
    second1();
  }, 200);
}

function second1() {
  tiout3 = setTimeout(() => {
    second.style.backgroundColor = "#f5ee89";
    second2();
  }, 200);
}

function second2() {
  tiout4 = setTimeout(() => {
    first.style.backgroundColor = "transparent";
    third1();
  }, 200);
}

function third1() {
  tiout5 = setTimeout(() => {
    third.style.backgroundColor = "#797cef";
    third2();
  }, 200);
}

function third2() {
  tiout6 = setTimeout(() => {
    third.style.backgroundColor = "transparent";
    first1();
  }, 200);
}
