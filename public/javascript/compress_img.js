const main_div2 = document.getElementById("main-div");
let com_box_value = document.getElementById("value-con");
let box_con = document.getElementById("compress-box");
let div = document.getElementById("span-con");
let compress_circle = document.getElementById("compress-circle");
let spans = document.querySelectorAll(".span-con span");
let btn = document.getElementById("compress");
let btn1 = document.getElementById("low-compress");
let btn2 = document.getElementById("mid-compress");
let btn3 = document.getElementById("extra-compress");
let ani_div = document.querySelector(".anim-com");
let first = document.querySelector(".first-e");
let second = document.querySelector(".second-e");
let third = document.querySelector(".third-e");
let tiout1, tiout2, tiout3, tiout4, tiout5, tiout6;

btn.addEventListener("click", () =>{
  const data = {
    com_val : com_box_value.value,
  }

  first1();
  main_div2.style.display = "none";
 
  fetch_data(data);
});

btn1.addEventListener("click", () =>{
  const data = {
    com_val : 70,
  }
 
  first1();
  main_div2.style.display = "none";
  fetch_data(data);
});

btn2.addEventListener("click", () =>{
  const data = {
    com_val : 40,
  }
 
  first1();
  main_div2.style.display = "none";
  fetch_data(data);
});

btn3.addEventListener("click", () =>{
  const data = {
    com_val : 20,
  }
 
  fetch_data(data);
});

async function fetch_data(da){
  const resp = await fetch("/download-compress-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(da),
  });

  const res_data = await resp.json();

    ani_div.style.display = "";
    main_div2.style.display = "block";
    clearTimeout(tiout1);
    clearTimeout(tiout2);
    clearTimeout(tiout3);
    clearTimeout(tiout4);
    clearTimeout(tiout5);
    clearTimeout(tiout6);

  if(res_data){
    const footer_tag = document.getElementsByTagName("footer");
    const main_tag = document.getElementsByTagName("main");
    main_tag[0].removeChild(main_div2);
    const div_d = document.createElement("div");
     div_d.classList.add("pdf-down-btn-con");

     const h1_tag = document.createElement("h1");
     h1_tag.textContent = "Image Compressed Succesfuly";
     div_d.appendChild(h1_tag);

     const a_tag = document.createElement("a");
     a_tag.setAttribute("download", "result.jpg");
     a_tag.textContent = "Download Image";
     a_tag.href = res_data.url;

     div_d.appendChild(a_tag);

     document.body.insertBefore(div_d, footer_tag[0]);
  }
  
}


let move = false,
  manchu = false;
let style;
let value_left;

function color(val) {
  style =
    compress_circle.currentStyle || window.getComputedStyle(compress_circle);
  value_left = style.left;
  box_con.style.background = `linear-gradient(to right, rgb(247, 116, 116) ${value_left}, white 0%)`;
  if (move || manchu) com_box_value.value = val+1;
  manchu = false;
}

document.addEventListener("mousedown", () => {
  move = true;
});

document.addEventListener("mouseup", () => {
  move = false;
});

spans[0].addEventListener("mouseover", () => {
  if (move) {
    compress_circle.style.left = "0%";
    color(0);
  }
});

spans[1].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "1%";
  color(1);
});
spans[2].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "2%";
  color(2);
});
spans[3].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "3%";
  color(3);
});
spans[4].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "4%";
  color(4);
});
spans[5].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "5%";
  color(5);
});
spans[6].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "6%";
  color(6);
});
spans[7].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "7%";
  color(7);
});
spans[8].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "8%";
  color(8);
});
spans[9].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "9%";
  color(9);
});
spans[10].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "10%";
  color(10);
});
spans[11].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "11%";
  color(11);
});
spans[12].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "12%";
  color(12);
});
spans[13].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "13%";
  color(13);
});
spans[14].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "14%";
  color(14);
});
spans[15].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "15%";
  color(15);
});
spans[16].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "16%";
  color(16);
});
spans[17].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "17%";
  color(17);
});
spans[18].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "18%";
  color(18);
});
spans[19].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "19%";
  color(19);
});
spans[20].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "20%";
  color(20);
});
spans[21].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "21%";
  color(21);
});
spans[22].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "22%";
  color(22);
});
spans[23].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "23%";
  color(23);
});
spans[24].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "24%";
  color(24);
});
spans[25].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "25%";
  color(25);
});
spans[26].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "26%";
  color(26);
});
spans[27].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "27%";
  color(27);
});
spans[28].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "28%";
  color(28);
});
spans[29].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "29%";
  color(29);
});
spans[30].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "30%";
  color(30);
});

spans[31].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "31%";
  color(31);
});
spans[32].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "32%";
  color(32);
});
spans[33].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "33%";
  color(33);
});
spans[34].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "34%";
  color(34);
});
spans[35].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "35%";
  color(35);
});
spans[36].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "36%";
  color(36);
});
spans[37].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "37%";
  color(37);
});
spans[38].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "38%";
  color(38);
});
spans[39].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "39%";
  color(39);
});
spans[40].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "40%";
  color(40);
});

spans[41].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "41%";
  color(41);
});
spans[42].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "42%";
  color(42);
});
spans[43].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "43%";
  color(43);
});
spans[44].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "44%";
  color(44);
});
spans[45].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "45%";
  color(45);
});
spans[46].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "46%";
  color(46);
});
spans[47].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "47%";
  color(47);
});
spans[48].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "48%";
  color(48);
});
spans[49].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "49%";
  color(49);
});
spans[50].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "50%";
  color(50);
});

spans[51].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "51%";
  color(51);
});
spans[52].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "52%";
  color(52);
});
spans[53].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "53%";
  color(53);
});
spans[54].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "54%";
  color(54);
});
spans[55].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "55%";
  color(55);
});
spans[56].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "56%";
  color(56);
});
spans[57].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "57%";
  color(57);
});
spans[58].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "58%";
  color(58);
});
spans[59].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "59%";
  color(59);
});
spans[60].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "60%";
  color(60);
});
spans[61].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "61%";
  color(61);
});
spans[62].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "62%";
  color(62);
});
spans[63].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "63%";
  color(63);
});
spans[64].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "64%";
  color(64);
});

spans[65].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "65%";
  color(65);
});
spans[66].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "66%";
  color(66);
});
spans[67].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "67%";
  color(67);
});
spans[68].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "68%";
  color(68);
});
spans[69].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "69%";
  color(69);
});
spans[70].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "70%";
  color(70);
});
spans[71].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "71%";
  color(71);
});
spans[72].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "72%";
  color(72);
});
spans[73].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "73%";
  color(73);
});
spans[74].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "74%";
  color(74);
});
spans[75].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "75%";
  color(75);
});
spans[76].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "76%";
  color(76);
});
spans[77].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "77%";
  color(77);
});
spans[78].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "78%";
  color(78);
});
spans[79].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "79%";
  color(79);
});
spans[80].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "80%";
  color(80);
});
spans[81].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "81%";
  color(81);
});
spans[82].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "82%";
  color(82);
});
spans[83].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "83%";
  color(83);
});
spans[84].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "84%";
  color(84);
});
spans[85].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "85%";
  color(85);
});
spans[86].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "86%";
  color(86);
});
spans[87].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "87%";
  color(87);
});
spans[88].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "88%";
  color(88);
});
spans[89].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "89%";
  color(89);
});
spans[90].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "90%";
  color(90);
});

spans[91].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "91%";
  color(91);
});
spans[92].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "92%";
  color(92);
});
spans[93].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "93%";
  color(93);
});
spans[94].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "94%";
  color(94);
});
spans[95].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "95%";
  color(95);
});
spans[96].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "96%";
  color(96);
});
spans[97].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "97%";
  color(97);
});
spans[98].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "98%";
  color(98);
});
spans[99].addEventListener("mouseover", () => {
  if (move) compress_circle.style.left = "99%";
  color(99);
});

spans[0].addEventListener("click", () => {
  compress_circle.style.left = "0%";
  color(0);
});

spans[1].addEventListener("click", () => {
  compress_circle.style.left = "1%";
  manchu = true;
  color(1);
});
spans[2].addEventListener("click", () => {
  compress_circle.style.left = "2%";
  manchu = true;
  color(2);
});
spans[3].addEventListener("click", () => {
  compress_circle.style.left = "3%";
  manchu = true;
  color(3);
});
spans[4].addEventListener("click", () => {
  compress_circle.style.left = "4%";
  manchu = true;
  color(4);
});
spans[5].addEventListener("click", () => {
  compress_circle.style.left = "5%";
  manchu = true;
  color(5);
});
spans[6].addEventListener("click", () => {
  compress_circle.style.left = "6%";
  manchu = true;
  color(6);
});
spans[7].addEventListener("click", () => {
  compress_circle.style.left = "7%";
  manchu = true;
  color(7);
});
spans[8].addEventListener("click", () => {
  compress_circle.style.left = "8%";
  manchu = true;
  color(8);
});
spans[9].addEventListener("click", () => {
  compress_circle.style.left = "9%";
  manchu = true;
  color(9);
});
spans[10].addEventListener("click", () => {
  compress_circle.style.left = "10%";
  manchu = true;
  color(10);
});
spans[11].addEventListener("click", () => {
  compress_circle.style.left = "11%";
  manchu = true;
  color(11);
});
spans[12].addEventListener("click", () => {
  compress_circle.style.left = "12%";
  manchu = true;
  color(12);
});
spans[13].addEventListener("click", () => {
  compress_circle.style.left = "13%";
  manchu = true;
  color(13);
});
spans[14].addEventListener("click", () => {
  compress_circle.style.left = "14%";
  manchu = true;
  color(14);
});
spans[15].addEventListener("click", () => {
  compress_circle.style.left = "15%";
  manchu = true;
  color(15);
});
spans[16].addEventListener("click", () => {
  compress_circle.style.left = "16%";
  manchu = true;
  color(16);
});
spans[17].addEventListener("click", () => {
  compress_circle.style.left = "17%";
  manchu = true;
  color(17);
});
spans[18].addEventListener("click", () => {
  compress_circle.style.left = "18%";
  manchu = true;
  color(18);
});
spans[19].addEventListener("click", () => {
  compress_circle.style.left = "19%";
  manchu = true;
  color(19);
});
spans[20].addEventListener("click", () => {
  compress_circle.style.left = "20%";
  manchu = true;
  color(20);
});
spans[21].addEventListener("click", () => {
  compress_circle.style.left = "21%";
  manchu = true;
  color(21);
});
spans[22].addEventListener("click", () => {
  compress_circle.style.left = "22%";
  manchu = true;
  color(22);
});
spans[23].addEventListener("click", () => {
  compress_circle.style.left = "23%";
  manchu = true;
  color(23);
});
spans[24].addEventListener("click", () => {
  compress_circle.style.left = "24%";
  manchu = true;
  color(24);
});
spans[25].addEventListener("click", () => {
  compress_circle.style.left = "25%";
  manchu = true;
  color(25);
});
spans[26].addEventListener("click", () => {
  compress_circle.style.left = "26%";
  manchu = true;
  color(26);
});
spans[27].addEventListener("click", () => {
  compress_circle.style.left = "27%";
  manchu = true;
  color(27);
});
spans[28].addEventListener("click", () => {
  compress_circle.style.left = "28%";
  manchu = true;
  color(28);
});
spans[29].addEventListener("click", () => {
  compress_circle.style.left = "29%";
  manchu = true;
  color(29);
});
spans[30].addEventListener("click", () => {
  compress_circle.style.left = "30%";
  manchu = true;
  color(30);
});

spans[31].addEventListener("click", () => {
  compress_circle.style.left = "31%";
  manchu = true;
  color(31);
});
spans[32].addEventListener("click", () => {
  compress_circle.style.left = "32%";
  manchu = true;
  color(32);
});
spans[33].addEventListener("click", () => {
  compress_circle.style.left = "33%";
  manchu = true;
  color(33);
});
spans[34].addEventListener("click", () => {
  compress_circle.style.left = "34%";
  manchu = true;
  color(34);
});
spans[35].addEventListener("click", () => {
  compress_circle.style.left = "35%";
  manchu = true;
  color(35);
});
spans[36].addEventListener("click", () => {
  compress_circle.style.left = "36%";
  manchu = true;
  color(36);
});
spans[37].addEventListener("click", () => {
  compress_circle.style.left = "37%";
  manchu = true;
  color(37);
});
spans[38].addEventListener("click", () => {
  compress_circle.style.left = "38%";
  manchu = true;
  color(38);
});
spans[39].addEventListener("click", () => {
  compress_circle.style.left = "39%";
  manchu = true;
  color(39);
});
spans[40].addEventListener("click", () => {
  compress_circle.style.left = "40%";
  manchu = true;
  color(40);
});

spans[41].addEventListener("click", () => {
  compress_circle.style.left = "41%";
  manchu = true;
  color(41);
});
spans[42].addEventListener("click", () => {
  compress_circle.style.left = "42%";
  manchu = true;
  color(42);
});
spans[43].addEventListener("click", () => {
  compress_circle.style.left = "43%";
  manchu = true;
  color(43);
});
spans[44].addEventListener("click", () => {
  compress_circle.style.left = "44%";
  manchu = true;
  color(44);
});
spans[45].addEventListener("click", () => {
  compress_circle.style.left = "45%";
  manchu = true;
  color(45);
});
spans[46].addEventListener("click", () => {
  compress_circle.style.left = "46%";
  manchu = true;
  color(46);
});
spans[47].addEventListener("click", () => {
  compress_circle.style.left = "47%";
  manchu = true;
  color(47);
});
spans[48].addEventListener("click", () => {
  compress_circle.style.left = "48%";
  manchu = true;
  color(48);
});
spans[49].addEventListener("click", () => {
  compress_circle.style.left = "49%";
  manchu = true;
  color(49);
});
spans[50].addEventListener("click", () => {
  compress_circle.style.left = "50%";
  manchu = true;
  color(50);
});

spans[51].addEventListener("click", () => {
  compress_circle.style.left = "51%";
  manchu = true;
  color(51);
});
spans[52].addEventListener("click", () => {
  compress_circle.style.left = "52%";
  manchu = true;
  color(52);
});
spans[53].addEventListener("click", () => {
  compress_circle.style.left = "53%";
  manchu = true;
  color(53);
});
spans[54].addEventListener("click", () => {
  compress_circle.style.left = "54%";
  manchu = true;
  color(54);
});
spans[55].addEventListener("click", () => {
  compress_circle.style.left = "55%";
  manchu = true;
  color(55);
});
spans[56].addEventListener("click", () => {
  compress_circle.style.left = "56%";
  manchu = true;
  color(56);
});
spans[57].addEventListener("click", () => {
  compress_circle.style.left = "57%";
  manchu = true;
  color(57);
});
spans[58].addEventListener("click", () => {
  compress_circle.style.left = "58%";
  manchu = true;
  color(58);
});
spans[59].addEventListener("click", () => {
  compress_circle.style.left = "59%";
  manchu = true;
  color(59);
});
spans[60].addEventListener("click", () => {
  compress_circle.style.left = "60%";
  manchu = true;
  color(60);
});
spans[61].addEventListener("click", () => {
  compress_circle.style.left = "61%";
  manchu = true;
  color(61);
});
spans[62].addEventListener("click", () => {
  compress_circle.style.left = "62%";
  manchu = true;
  color(62);
});
spans[63].addEventListener("click", () => {
  compress_circle.style.left = "63%";
  manchu = true;
  color(63);
});
spans[64].addEventListener("click", () => {
  compress_circle.style.left = "64%";
  manchu = true;
  color(64);
});

spans[65].addEventListener("click", () => {
  compress_circle.style.left = "65%";
  manchu = true;
  color(65);
});
spans[66].addEventListener("click", () => {
  compress_circle.style.left = "66%";
  manchu = true;
  color(66);
});
spans[67].addEventListener("click", () => {
  compress_circle.style.left = "67%";
  manchu = true;
  color(67);
});
spans[68].addEventListener("click", () => {
  compress_circle.style.left = "68%";
  manchu = true;
  color(68);
});
spans[69].addEventListener("click", () => {
  compress_circle.style.left = "69%";
  manchu = true;
  color(69);
});
spans[70].addEventListener("click", () => {
  compress_circle.style.left = "70%";
  manchu = true;
  color(70);
});
spans[71].addEventListener("click", () => {
  compress_circle.style.left = "71%";
  manchu = true;
  color(71);
});
spans[72].addEventListener("click", () => {
  compress_circle.style.left = "72%";
  manchu = true;
  color(72);
});
spans[73].addEventListener("click", () => {
  compress_circle.style.left = "73%";
  manchu = true;
  color(73);
});
spans[74].addEventListener("click", () => {
  compress_circle.style.left = "74%";
  manchu = true;
  color(74);
});
spans[75].addEventListener("click", () => {
  compress_circle.style.left = "75%";
  manchu = true;
  color(75);
});
spans[76].addEventListener("click", () => {
  compress_circle.style.left = "76%";
  manchu = true;
  color(76);
});
spans[77].addEventListener("click", () => {
  compress_circle.style.left = "77%";
  manchu = true;
  color(77);
});
spans[78].addEventListener("click", () => {
  compress_circle.style.left = "78%";
  manchu = true;
  color(78);
});
spans[79].addEventListener("click", () => {
  compress_circle.style.left = "79%";
  manchu = true;
  color(79);
});
spans[80].addEventListener("click", () => {
  compress_circle.style.left = "80%";
  manchu = true;
  color(80);
});
spans[81].addEventListener("click", () => {
  compress_circle.style.left = "81%";
  manchu = true;
  color(81);
});
spans[82].addEventListener("click", () => {
  compress_circle.style.left = "82%";
  manchu = true;
  color(82);
});
spans[83].addEventListener("click", () => {
  compress_circle.style.left = "83%";
  manchu = true;
  color(83);
});
spans[84].addEventListener("click", () => {
  compress_circle.style.left = "84%";
  manchu = true;
  color(84);
});
spans[85].addEventListener("click", () => {
  compress_circle.style.left = "85%";
  manchu = true;
  color(85);
});
spans[86].addEventListener("click", () => {
  compress_circle.style.left = "86%";
  manchu = true;
  color(86);
});
spans[87].addEventListener("click", () => {
  compress_circle.style.left = "87%";
  manchu = true;
  color(87);
});
spans[88].addEventListener("click", () => {
  compress_circle.style.left = "88%";
  manchu = true;
  color(88);
});
spans[89].addEventListener("click", () => {
  compress_circle.style.left = "89%";
  manchu = true;
  color(89);
});
spans[90].addEventListener("click", () => {
  compress_circle.style.left = "90%";
  manchu = true;
  color(90);
});

spans[91].addEventListener("click", () => {
  compress_circle.style.left = "91%";
  manchu = true;
  color(91);
});
spans[92].addEventListener("click", () => {
  compress_circle.style.left = "92%";
  manchu = true;
  color(92);
});
spans[93].addEventListener("click", () => {
  compress_circle.style.left = "93%";
  manchu = true;
  color(93);
});
spans[94].addEventListener("click", () => {
  compress_circle.style.left = "94%";
  manchu = true;
  color(94);
});
spans[95].addEventListener("click", () => {
  compress_circle.style.left = "95%";
  manchu = true;
  color(95);
});
spans[96].addEventListener("click", () => {
  compress_circle.style.left = "96%";
  manchu = true;
  color(96);
});
spans[97].addEventListener("click", () => {
  compress_circle.style.left = "97%";
  manchu = true;
  color(97);
});
spans[98].addEventListener("click", () => {
  compress_circle.style.left = "98%";
  manchu = true;
  color(98);
});
spans[99].addEventListener("click", () => {
  compress_circle.style.left = "99%";
  manchu = true;
  color(99);
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