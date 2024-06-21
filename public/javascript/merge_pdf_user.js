let selected_ele;
const full_div = document.querySelector(".content-con");
const ani_div = document.querySelector(".anim-com");
const first = document.querySelector(".first-e");
const second = document.querySelector(".second-e");
const third = document.querySelector(".third-e");
const pdf_con = document.querySelector(".pdf-con");
let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;
let moving = null;


window.addEventListener("DOMContentLoaded", async () => {
  const main_div = document.querySelector(".main-pdf-con");
  const merge_btn = document.querySelector(".merger-btn");

  first1();
  full_div.style.display = "none";

  const resp = await fetch("/get_pdf_merge_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();
  ani_div.style.display = "";
  full_div.style.display = "block";
  clearTimeout(tiout1);
  clearTimeout(tiout2);
  clearTimeout(tiout3);
  clearTimeout(tiout4);
  clearTimeout(tiout5);
  clearTimeout(tiout6);
  const { img_names } = data;
  // console.log(img_names);
  for (let i = 0; i < img_names.length; i++) {
    const div = document.createElement("div");
    div.classList.add("each-pdf");
    div.setAttribute("draggable", "true");
    div.setAttribute("ontouchstart", "pickup(event)");
    div.setAttribute("ontouchend", "drop(event)");
    div.setAttribute("ontouchmove", "move(event)");
    div.setAttribute("style", `background-image:url(pdf_im/${img_names[i]})`);
    const div_remove = document.createElement("div");
    div_remove.classList.add("remove-div");
    div_remove.textContent = "\u{274C}";
    div.appendChild(div_remove);
    pdf_con.appendChild(div);
  }

  const images = document.querySelectorAll(".each-pdf");
  cross_tag = document.querySelectorAll(".remove-div");

  for(cross_tags of cross_tag){
    cross_tags.addEventListener("click", (e) =>{
      cross_tag = document.querySelectorAll(".remove-div");
      if(cross_tag.length>2){
      e.target.parentElement.remove();
      }
    })
  }

  for (image of images) {
    image.addEventListener("dragstart", (e) => {
      // console.log("drag start");
      e.target.style.borderStyle = `dashed`;
      e.target.style.borderColor = `red`;
      selected_ele = e.target;
    });

    image.addEventListener("dragend", (e) => {
      // console.log("drag end");
      selected_ele.style.borderStyle = `solid`;
      e.target.style.borderColor = `black`;
    });

    image.addEventListener("dragover", (e) => {
      if(e.target.className == "each-pdf")
          pdf_con.insertBefore(selected_ele, e.target);
    });
  }

  merge_btn.addEventListener("click", async () => {
    first1();
    full_div.style.display = "none";

    const set_names = [];
    const child_nodes = pdf_con.childNodes;
    for (let i = 0; i < child_nodes.length; i++) {
      let style = child_nodes[i].style.backgroundImage;
      for (let j = 0; j < img_names.length; j++) {
        let check = style.includes(img_names[j]);
        if (check) {
          set_names[i] = `${img_names[j]}`;
          break;
        }
      }
    }


    const resp = await fetch("/merge-set-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ names: set_names }),
    });

    const pdf_nam = await resp.json();
    if (pdf_nam) {
      ani_div.style.display = "";
      full_div.style.display = "block";
      clearTimeout(tiout1);
      clearTimeout(tiout2);
      clearTimeout(tiout3);
      clearTimeout(tiout4);
      clearTimeout(tiout5);
      clearTimeout(tiout6);

      merge_btn.remove();
      pdf_con.remove();
      const down_div = document.createElement("div");
      down_div.classList.add("down-con");

      const h1_tag = document.createElement("h1");
      h1_tag.textContent = "PDFs Successfuly Merged";
      down_div.appendChild(h1_tag);

      const a_tag = document.createElement("a");
      a_tag.setAttribute("download", "merged.pdf");
      a_tag.href = "merged_pdf/" + pdf_nam.pdf_nam;
      a_tag.textContent = "Download";
      down_div.appendChild(a_tag);

      main_div.appendChild(down_div);
    }
  });
});

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


function pickup(event) {
  if(event.target.className == "each-pdf"){
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
          // mousemove
          moving.style.left = event.clientX - moving.clientWidth/2;
          moving.style.top = event.clientY - moving.clientHeight/2;
      } else {
          // touchmove - assuming a single touchpoint
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

          if(target.className == "each-pdf" ){
            pdf_con.insertBefore(moving, target);

          }
      }

      // reset our element
      moving.style.left = '';
      moving.style.top = '';
      // moving.style.height = '';
      // moving.style.width = '';
      moving.style.position = '';
      moving.style.zIndex = '';

      moving = null;
  }
}
