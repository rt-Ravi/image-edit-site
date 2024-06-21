const input = document.getElementById("inputTag");
const imageName = document.getElementById("imageName");
const pngform = document.getElementById("pngform");
const main_div = document.querySelector(".content-con");
const ani_div = document.querySelector(".anim-com");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
const info_div = document.querySelector(".information");

const all_elemets_con = document.getElementById("main-img-pdf-grid-box");
const flex_img = document.getElementById("flex-img-con");
const tool_box_dis_btn = document.getElementById("dis-tool");
const tool_box_rm_btn = document.getElementById("tool-box-rm");
const tool_box = document.getElementById("tool-con");
const makepdf_btn = document.getElementById("makepdf-btn");
const down_btn_con = document.getElementById("down-btn-con");

const vtop = document.getElementById("vtop");
const vcenter = document.getElementById("vcenter");
const vbottom = document.getElementById("vbottom");

const hleft = document.getElementById("hleft");
const hcenter = document.getElementById("hcenter");
const hright = document.getElementById("hright");

const vertical = document.getElementById("vertical");
const horizontal = document.getElementById("horizontal");
horizontal.style.display = "none";
const portrait = document.getElementById("portrait");
const landscape = document.getElementById("landscape");
const page_box = document.getElementsByClassName("single-img-con");

let image_name;
let cross_tag;
let img_pos = "center";
let moving = null;

let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;
let imgsize = 0;
let imgtype;
let inputImage;
let validate = true;

const pdf_info = {
  file_name: [],
  portrait: false,
  landscape: true,
  img_position: "center",
  page_size: "A4",
};

const size = {
  A1: [400, 500],
  A2: [300, 400],
  A3: [250, 300],
  A4: [200, 250],
  A5: [150, 200],
  A6: [100, 150],
  A7: [80, 100],
  A8: [70, 90],
  A9: [50, 70],
  A10: [40, 60],
};

let images;
let selected_ele;
let por = false,
  lan = true;

input.addEventListener("change", () => {
  inputImage = document.querySelector("input[type=file]").files;
  for (let i = 0; i < inputImage.length; i++) {
    let eachFile = inputImage[i];
    imgsize = eachFile.size / 1024 / 1024;
    imgtype = eachFile.type;

    if (
      !(
        imgsize <= 11 &&
        (imgtype.includes("png") ||
          imgtype.includes("jpg") ||
          imgtype.includes("jpeg") ||
          imgtype.includes("bmp") ||
          imgtype.includes("gif") ||
          imgtype.includes("tiff"))
      )
    ) {
      validate = false;
      break;
    } else {
      validate = true;
    }
  }

  if (validate) imageName.innerText = `${inputImage.length} Images`;
  else imageName.innerText = `Wrong File Selected`;
});

pngform.addEventListener("submit", check);

async function check(e) {
  e.preventDefault();
  if(!inputImage){
    imageName.innerText = "Please select Images";
  }
  else if (!validate) e.preventDefault();
  else if (!navigator.cookieEnabled) {
    e.preventDefault();
    imageName.innerText = "Please Enable Cookie";
  }else if(inputImage.length > 40){
    e.preventDefault();
    imageName.innerText = "Only 40 images allowed at a time";
  }else if(inputImage.length <= 0){
    e.preventDefault();
    imageName.innerText = "Please select Images";
  }else {
    e.preventDefault();
    first1();
    main_div.style.display = "none";
    const formData = new FormData();
    for (let i = 0; i < inputImage.length; i++) {
      formData.append("imagess", inputImage[i]);
    }
    const res = await fetch("/image-to-pdf", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json();
    if (data) {
      clearTimeout(tiout1);
      clearTimeout(tiout2);
      clearTimeout(tiout3);
      clearTimeout(tiout4);
      clearTimeout(tiout5);
      clearTimeout(tiout6);
      ani_div.style.display = "none";
      main_div.remove();
      info_div.remove();
      all_elemets_con.style.display = "grid";
      apend_child(data.url)
      image_name = data.url;
    }
  }
}

tool_box_dis_btn.addEventListener("click", () => {
  tool_box.style.display = "block";
});

tool_box_rm_btn.addEventListener("click", () => {
  tool_box.style.display = "";
});

portrait.addEventListener("click", () => {
  if (por) {
    let style = images[0].currentStyle || window.getComputedStyle(images[0]);
    let height = style.height;
    let width = style.width;
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = height;
      images[i].style.height = width;
    }

    lan = true;
    por = false;

    vertical.style.display = "block";
    horizontal.style.display = "none";
  }
});

landscape.addEventListener("click", () => {
  if (lan) {
    images = document.querySelectorAll(".single-img-con");
    let style = images[0].currentStyle || window.getComputedStyle(images[0]);
    let height = style.height;
    let width = style.width;
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = height;
      images[i].style.height = width;
    }
    por = true;
    lan = false;
    vertical.style.display = "none";
    horizontal.style.display = "block";
  }
});

function apend_child(img_val) {
  let im_url;
  console.log(typeof img_val);
  if(typeof img_val == "string"){
    const div = document.createElement("div");
      div.classList.add("single-img-con");
      div.setAttribute("draggable", "true");
      div.setAttribute("ontouchstart", "pickup(event)");
      div.setAttribute("ontouchend", "drop(event)");
      div.setAttribute("ontouchmove", "move(event)");
      div.setAttribute("style", `background-image:url(${img_val})`);
      const div_remove = document.createElement("div");
      div_remove.classList.add("remove-div");
      div_remove.textContent = "\u{274C}";
      div.appendChild(div_remove);
      flex_img.appendChild(div);
  }
  else{
    for (let i = 0; i < img_val.length; i++) {
      // Create an "div" node:
      const div = document.createElement("div");
      div.classList.add("single-img-con");
      div.setAttribute("draggable", "true");
      div.setAttribute("ontouchstart", "pickup(event)");
      div.setAttribute("ontouchend", "drop(event)");
      div.setAttribute("ontouchmove", "move(event)");
      div.setAttribute("style", `background-image:url(${img_val[i]})`);
      const div_remove = document.createElement("div");
      div_remove.classList.add("remove-div");
      div_remove.textContent = "\u{274C}";
      div.appendChild(div_remove);
      flex_img.appendChild(div);
    }
  }

  images = document.querySelectorAll(".single-img-con");
  cross_tag = document.querySelectorAll(".remove-div");

  for (cross_tags of cross_tag) {
    cross_tags.addEventListener("click", (e) => {
      cross_tag = document.querySelectorAll(".remove-div");
      if (cross_tag.length > 1) {
        e.target.parentElement.remove();
      }
    });
  }

  for (image of images) {
    image.addEventListener("dragstart", (e) => {
      e.target.style.borderStyle = `dashed`;
      e.target.style.borderColor = `red`;
      selected_ele = e.target;
    });

    image.addEventListener("dragend", (e) => {
      selected_ele.style.borderStyle = `solid`;
      e.target.style.borderColor = `black`;
    });

    image.addEventListener("dragover", (e) => {
      if (e.target.className == "single-img-con")
      flex_img.insertBefore(selected_ele, e.target);
    });
  }
}

vtop.addEventListener("click", () => {
  for (let i = 0; i < page_box.length; i++) {
    page_box[i].style.backgroundPosition = "top";
  }
  img_pos = "top";
});

vcenter.addEventListener("click", () => {
  for (let i = 0; i < page_box.length; i++) {
    page_box[i].style.backgroundPosition = "center";
  }
  img_pos = "center";
});

vbottom.addEventListener("click", () => {
  for (let i = 0; i < page_box.length; i++) {
    page_box[i].style.backgroundPosition = "bottom";
  }
  img_pos = "bottom";
});

hleft.addEventListener("click", () => {
  for (let i = 0; i < page_box.length; i++) {
    page_box[i].style.backgroundPosition = "left";
  }
  img_pos = "left";
});

hcenter.addEventListener("click", () => {
  for (let i = 0; i < page_box.length; i++) {
    page_box[i].style.backgroundPosition = "center";
  }
  img_pos = "center";
});

hright.addEventListener("click", () => {
  for (let i = 0; i < page_box.length; i++) {
    page_box[i].style.backgroundPosition = "right";
  }
  img_pos = "right";
});

function res(event) {
  let page_s = this.options[this.selectedIndex].text;
  switch (page_s) {
    case "A1":
      pdf_info.page_size = "A1";
      change_size(size.A1);
      break;

    case "A2":
      pdf_info.page_size = "A2";
      change_size(size.A2);
      break;

    case "A3":
      pdf_info.page_size = "A3";
      change_size(size.A3);
      break;

    case "A4":
      pdf_info.page_size = "A4";
      change_size(size.A4);
      break;

    case "A5":
      pdf_info.page_size = "A5";
      change_size(size.A5);
      break;

    case "A6":
      pdf_info.page_size = "A6";
      change_size(size.A6);
      break;

    case "A7":
      pdf_info.page_size = "A7";
      change_size(size.A7);
      break;

    case "A8":
      pdf_info.page_size = "A8";
      change_size(size.A8);
      break;

    case "A9":
      pdf_info.page_size = "A9";
      change_size(size.A9);
      break;

    case "A10":
      pdf_info.page_size = "A10";
      change_size(size.A10);
      break;
  }
}

function change_size(val) {
  if (!por) {
    for (let i = 0; i < page_box.length; i++) {
      page_box[i].style.width = `${val[0]}px`;
      page_box[i].style.height = `${val[1]}px`;
    }
  } else {
    for (let i = 0; i < page_box.length; i++) {
      page_box[i].style.width = `${val[1]}px`;
      page_box[i].style.height = `${val[0]}px`;
    }
  }
}

makepdf_btn.addEventListener("click", async () => {
  first1();
  all_elemets_con.style.display = "none";

  if(typeof image_name == "string"){
    pdf_info.file_name[0] = `../public/${image_name}`;
  }else{
    const child_div = flex_img.childNodes.length;
    for (let i = 0; i < child_div; i++) {
      let style = flex_img.childNodes[i].style.backgroundImage;
      for (let j = 0; j < image_name.length; j++) {
        let check = style.includes(image_name[j]);
        if (check) {
          pdf_info.file_name[i] = `../public/${image_name[j]}`;
          break;
        }
      }
    }
  }
  

  pdf_info.portrait = !por;
  pdf_info.landscape = !lan;
  pdf_info.img_position = img_pos;

  console.log(pdf_info);

  const resp = await fetch("/make_pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pdf_info),
  });

  const data = await resp.json();

  if (data) {
    ani_div.style.display = "";
    all_elemets_con.style.display = "grid";
    clearTimeout(tiout1);
    clearTimeout(tiout2);
    clearTimeout(tiout3);
    clearTimeout(tiout4);
    clearTimeout(tiout5);
    clearTimeout(tiout6);

    const footer_tag = document.getElementsByTagName("footer");

    all_elemets_con.remove();
    const div_d = document.createElement("div");
    div_d.classList.add("pdf-down-btn-con");

    const h1_tag = document.createElement("h1");
    h1_tag.textContent = "PDF succesfuly created";
    div_d.appendChild(h1_tag);

    const a_tag = document.createElement("a");
    a_tag.setAttribute("download", "result.pdf");
    a_tag.textContent = "Download PDF";
    a_tag.href = data.pdf_url;

    div_d.appendChild(a_tag);

    document.body.insertBefore(div_d, footer_tag[0]);
  }
});

function pickup(event) {


  if(event.target.className == "single-img-con"){
    moving = event.target;
    moving.style.height = moving.clientHeight;
    moving.style.width = moving.clientWidth;
    moving.style.position = 'absolute';
    moving.style.zIndex = '-10';
  }
}

function move(event) {
  if (moving) {
      if (event.clientX) {
          moving.style.left = event.clientX - moving.clientWidth/2;
          moving.style.top = event.clientY - moving.clientHeight/2;
      } else {
          moving.style.left = event.changedTouches[0].clientX - moving.clientWidth/2 + "px";
          moving.style.top = event.changedTouches[0].clientY - moving.clientHeight/2 + "px";

      }
  }
}

function drop(event) {
  if (moving) {
      if (event.currentTarget.tagName !== 'HTML') {
          let target = null;
          if (event.clientX) {
              target = document.elementFromPoint(event.clientX, event.clientY);
          } else {
              target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
          }

          if(target.className == "single-img-con" ){
              flex_img.insertBefore(moving, target);
          }
      }

      // reset our element
      moving.style.left = '';
      moving.style.top = '';
      moving.style.position = '';
      moving.style.zIndex = '';
      moving = null;
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
