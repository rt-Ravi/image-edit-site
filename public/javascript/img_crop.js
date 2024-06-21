let circle = false,
  triangle = false,
  diamond = false,
  star = false,
  square = true;

let obj = {
  aspectRatio: 0,
  viewMode: 3,
  dragMode: "move",
};

const tool_box_display = document.getElementById("tool-box-display");
const tool_con = document.getElementById("tool-con");
const cross_con = document.getElementById("cross-con");
const download = document.getElementById("download");
const image = document.getElementById("image");
const button = document.getElementById("button");
const result = document.getElementById("result");
var croppable = false;
var cropper = new Cropper(image, obj);
let ele1 = document.getElementsByClassName("cropper-face"),
  ele2 = document.getElementsByClassName("cropper-view-box");

cross_con.addEventListener("click", () => {
  tool_con.style.display = "";
});

tool_box_display.addEventListener("click", () => {
  tool_con.style.display = "block";
});

function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    if (document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelectorAll(querySelector).length) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        observer.disconnect();
        reject();
      }, timeout);
  });
}

waitForElement(".cropper-container", 3000)
  .then(function () {
    ele1[0].style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
    ele1[0].style.borderRadius = "opx";
    ele2[0].style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
    ele2[0].style.borderRadius = "0px";
  })
  .catch(() => {
    // console.log("element did not load in 3 seconds");
  });

function changeShape(shape) {
  switch (shape) {
    case "circle":
      changeShapeAndAspectRatio(1);
      (circle = true),
        (square = false),
        (triangle = false),
        (star = false),
        (diamond = false);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath = "none";
          ele1[0].style.borderRadius = "50%";
          ele2[0].style.clipPath = "none";
          ele2[0].style.borderRadius = "50%";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });

      break;

    case "triangle":
      changeShapeAndAspectRatio(1);
      (circle = false),
        (square = false),
        (triangle = true),
        (star = false),
        (diamond = false);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
          ele1[0].style.borderRadius = "opx";
          ele2[0].style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
          ele2[0].style.borderRadius = "0px";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });

      break;

    case "square":
      changeShapeAndAspectRatio(1);
      (circle = false),
        (square = true),
        (triangle = false),
        (star = false),
        (diamond = false);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath = "none";
          ele1[0].style.borderRadius = "0px";
          ele2[0].style.clipPath = "none";
          ele2[0].style.borderRadius = "0px";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });

      break;

    case "star":
      changeShapeAndAspectRatio(1);
      (circle = false),
        (square = false),
        (triangle = false),
        (star = true),
        (diamond = false);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath =
            "polygon(50% 0%, 59% 38%, 100% 38%, 75% 64%, 100% 100%, 49% 83%, 0 100%, 22% 65%, 0 38%, 40% 38%)";
          ele1[0].style.borderRadius = "0px";
          ele2[0].style.clipPath =
            "polygon(50% 0%, 59% 38%, 100% 38%, 75% 64%, 100% 100%, 49% 83%, 0 100%, 22% 65%, 0 38%, 40% 38%)";
          ele2[0].style.borderRadius = "0px";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });

      break;

    case "diamond":
      changeShapeAndAspectRatio(1);
      (circle = false),
        (square = false),
        (triangle = false),
        (star = false),
        (diamond = true);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath =
            " polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
          ele1[0].style.borderRadius = "0px";
          ele2[0].style.clipPath =
            " polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
          ele2[0].style.borderRadius = "0px";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });

      // console.log(ele2);
      break;

    case "rectangle":
      changeShapeAndAspectRatio(0);
      (circle = false),
        (square = true),
        (triangle = false),
        (star = false),
        (diamond = false);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath = "none";
          ele1[0].style.borderRadius = "0px";
          ele2[0].style.clipPath = "none";
          ele2[0].style.borderRadius = "0px";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });

      // console.log(ele2);
      break;

    default:
      changeShapeAndAspectRatio(0);
      (circle = false),
        (square = true),
        (triangle = false),
        (star = false),
        (diamond = false);
      waitForElement(".cropper-container", 3000)
        .then(function () {
          ele1[0].style.clipPath = "none";
          ele1[0].style.borderRadius = "0px";
          ele2[0].style.clipPath = "none";
          ele2[0].style.borderRadius = "0px";
        })
        .catch(() => {
          // console.log("element did not load in 3 seconds");
        });
  }
}

const changeShapeAndAspectRatio = (val) => {
  obj.aspectRatio = val;
  cropper.destroy();
  cropper = new Cropper(image, obj);
};

// circle shape crop start
function circleShapeCrop(sourceCanvas) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}
// circle shape crop end

//  triangle crop start
function triangleShapeCrop(sourceCanvas) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  const half = width / 2;
  const full = width;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.moveTo(half, 0);
  context.lineTo(full, full);
  context.lineTo(0, full);
  context.lineTo(half, 0);
  context.closePath();
  context.fill();
  return canvas;
}
//  triangle crop end

//  star crop start
function starShapeCrop(sourceCanvas) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  const full = width;
  const half = full / 2;
  const fiftyMinus = half - (full * 12.5) / 100;
  const fiftyPlus = half + (full * 12.5) / 100;
  const halfhalf = half / 2;
  const halffull = (full * 75) / 100;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.moveTo(0, fiftyMinus);
  context.lineTo(fiftyMinus, fiftyMinus);
  context.lineTo(half, 0);
  context.lineTo(fiftyPlus, fiftyMinus);
  context.lineTo(full, fiftyMinus);
  context.lineTo(halffull, fiftyPlus);
  context.lineTo(full, full);
  context.lineTo(half, halffull);
  context.lineTo(0, full);
  context.lineTo(halfhalf, fiftyPlus);
  context.lineTo(0, fiftyMinus);
  context.closePath();
  context.fill();
  return canvas;
}
//  star crop end

//  diomand crop start
function diomandShapeCrop(sourceCanvas) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  const half = width / 2;
  const full = width;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.moveTo(half, 0);
  context.lineTo(full, half);
  context.lineTo(half, full);
  context.lineTo(0, half);
  context.lineTo(half, 0);
  context.closePath();
  context.fill();
  return canvas;
}
//  diomand crop end

window.addEventListener("DOMContentLoaded", man);

function man() {
  // alert("bro");

  button.onclick = function () {
    var croppedCanvas;
    var roundedCanvas;
    var roundedImage;

    // Crop
    croppedCanvas = cropper.getCroppedCanvas();

    if (triangle) roundedCanvas = triangleShapeCrop(croppedCanvas);
    else if (circle) roundedCanvas = circleShapeCrop(croppedCanvas);
    else if (diamond) roundedCanvas = diomandShapeCrop(croppedCanvas);
    else if (star) roundedCanvas = starShapeCrop(croppedCanvas);
    else roundedCanvas = croppedCanvas;

    // Show
    roundedImage = document.createElement("img");
    roundedImage.src = roundedCanvas.toDataURL("image/png");
    download.href = roundedCanvas.toDataURL("image/png");
    result.innerHTML = "";
    result.appendChild(roundedImage);
  };
}
