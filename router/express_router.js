const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const {
  fun,
  resize_the_img,
  black_and_white,
  B_W_COLOR,
  delete_color_img_data,
  crop_img_save,
  save_com_file,
  down_com_image,
  image_to_pdf_save,
  make_pdf,
  color_img,
  pdf_to_image,
  pdf_merger,
  get_pdf_merge_data,
  merge_pdf,
  delete_pdf_merge_data,
  compress_pdf,
} = require("../module/image_format_change");

// home page
router.get("/", (req, res) => {
  res.render("index");
});

// about page
router.get("/contact", (req, res) => {
  res.render("contact");
});

// about page
router.get("/about", (req, res) => {
  res.render("about");
});



// privacy policy page
router.get("/privacy-policy", (req, res) => {
  res.render("privacy_policy");
});


// terms and conditions page
router.get("/terms-and-conditions", (req, res) => {
  res.render("terms_and_condition");
});

// change img format start
router.get("/change-image-format-to-jpg-png-bmp-tiff-gif", (req, res) => {
  res.render("change_image_format");
});

router.post("/change-image-format-to-jpg-png-bmp-tiff-gif", (req, res) => {
  try {
    fun(req, res);
  } catch (err) {
    res
      .status(409)
      .send("<h1>Uploaded file cannot be changed in other format</h1>");
  }
});
// change img format end

// change img format and size start
router.get("/change-format-and-resize-image-width-height", (req, res) => {
  res.render("change_and_resize_image_width_height");
});

router.post(
  "/change-format-and-resize-image-width-height",
  urlencodedParser,
  (req, res) => {
    try {
      resize_the_img(req, res);
    } catch (err) {
      res.status(409).send("<h1>Uploaded file is Wrong</h1>");
    }
  }
);
// change img format and size end

// covert to black and white start
router.get("/convert-image-to-black-and-white", (req, res) => {
  res.render("convert_to_black_white");
});

router.post("/convert-image-to-black-and-white", urlencodedParser, (req, res) => {
  try {
    black_and_white(req, res);
  } catch (err) {
    res.status(409).send("<h1>Uploaded file is Wrong</h1>");
  }
});

// covert to black and white end

// covert to black and white to color start
router.get("/convert-black-and-white-image-to-color-image", async (req, res) => {
  await visit_user(req, res);
  res.render("black_and_white_to_color");
});

router.post("/convert-black-and-white-image-to-color-image", urlencodedParser, async (req, res) => {
    try {
      const data = await get_visit_data(req, res);
      if(data){
        B_W_COLOR(req, res);
        await delete_visit_data(req, res);
      }else{
        delete_color_img_data(req, res);
      }
    } catch (err) {
      res.status(409).send("<h1>Uploaded file is Wrong</h1>");
    }
  }
);

router.post("/color-img", (req, res) => {
  color_img(req, res);
});

// covert to black and white to color end

// crop image start

router.post("/crop-image", async (req, res) => {
  crop_img_save(req, res);
});

router.get("/crop-image-with-different-shapes-star-rectangle-circle-square-triangle-diamond-online", async (req, res) => {
  res.render("img_crop");
});
// crop image ends

// crompress image starts

router.post("/com", async (req, res) => {
  save_com_file(req, res);
});


router.get("/compress-image-online", async (req, res) => {
  res.render("image_compressor");
});

router.post("/download-compress-image", urlencodedParser, async (req, res) => {
  try {
    down_com_image(req, res);
  } catch (error) {
    res.status(500).send("<h1>Image cannot be compressed</h1>");
  }
});

// crompress image ends

// image to pdf starts starts

router.post("/image-to-pdf", async (req, res) => {
 image_to_pdf_save(req, res);
});

router.get("/convert-image-to-pdf-in-A4-A5-A6-A7-sizes", async (req, res) => {
  res.render("image_to_pdf");
});

router.post("/make_pdf", urlencodedParser, (req, res) => {
  try {
    make_pdf(req, res);
  } catch (error) {
    res.status(500).send("<h1>Cannot Make PDF</h1>");
  }
});

// image to pdf end


// pdf to img starts 
router.get("/pdf-to-image", async(req, res) => {
  await visit_user(req, res);
  res.render("pdf_to_image");
});

router.post("/pdf-to-image", async (req, res) => {
  const data = await get_visit_data(req, res);
  if(data){
    pdf_to_image(req, res);
    await delete_visit_data(req, res);
  }else{
    res.redirect("/pdf-to-image");
  }
});
// pdf to img end

// pdf merger start

router.get("/pdf-merger", async (req, res) =>{
  await visit_user(req, res);
  res.render("pdf_merger");
})

router.post("/pdf-merger", async (req, res) =>{
  const data = await get_visit_data(req, res);
  if(data){
    pdf_merger(req, res);
    await delete_visit_data(req, res);
  }else{
    delete_pdf_merge_data(req, res);
  }
})

router.post("/get_pdf_merge_data",get_pdf_merge_data, (req, res) =>{
  res.send(req.data);
})

router.post("/merge-set-pdf", merge_pdf, async (req, res) =>{
  res.send({pdf_nam : req.data});
})

// pdf merger end

// pdf compress start

router.get("/pdf-compress", async (req, res) =>{
  await visit_user(req, res);
  res.render("pdf_compressor");
})

router.post("/pdf-compress", async (req, res) =>{
  const data = await get_visit_data(req, res);
  if(data){
    compress_pdf(req, res);
    await delete_visit_data(req, res);
  }else{
    res.redirect("/pdf-compress");
  }
})

// pdf compress end

// router.post("/upload", (req, res)=>{
//   console.log(req.files.file);
// })

// 404 page not found start

router.get("/*", (req, res) =>{
  res.status(404).render("404_not_found");
})
// 404 page not found end

module.exports = router;
