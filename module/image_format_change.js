const { v4: uuidv4 } = require("uuid");
var { zip } = require("zip-a-folder");
const imgtopdf = require("image-to-pdf");
const gs = require("ghostscript-node");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const PDFMerger = require('pdf-merger-js');

const { spawn } = require("child_process");

// image format change start
const fun = (req, res) => {
  try {
    let format = req.body.name;
    let img_quality, extType;

    switch (format) {
      case "jpg":
        img_quality = 40;
        extType = ".JPG";
        break;

      case "png":
        img_quality = 100;
        extType = ".PNG";
        break;

      case "bmp":
        img_quality = 70;
        extType = ".BMP";
        break;

      case "gif":
        img_quality = 80;
        extType = ".GIF";
        break;

      case "tiff":
        img_quality = 90;
        extType = ".TIFF";
        break;
    }

    const allwedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".tiff"];
    const upload_file = req.files.file;
    const extensionName = path.extname(upload_file.name);
    // console.log(extensionName);
    const imgSize = upload_file.size / 1024 / 1024;
    if (imgSize > 11) {
      return res.status(413).send("File size is greater than 11MB");
    } else if (!allwedExtensions.includes(extensionName.toLowerCase())) {
      return res
        .status(422)
        .send(
          "Allowded Extensions of uploaded imgage are .png, .jpg, jpeg, .gif, .tiff, .bmp, .svg"
        );
    } else {
      let file_nam = `${uuidv4()}${Date.now()}_img`;
      let location = `../public/uploaded_file/${file_nam}${extensionName}`;
      let procesed_file;
      upload_file.mv(location, (err) => {
        if (err) {
          return res.status(500).send("<h1>File Not Converted");
        } else {
          procesed_file = `../public/procesed_file/result${file_nam}${extType}`;

          async function lady() {
            const img_result = await Jimp.read(location);

            img_result.quality(img_quality);
            await img_result.writeAsync(procesed_file);
            fs.unlink(location, (err)=>{});
            return res.status(200).send({url:`procesed_file/result${file_nam}${extType}`});
          }

          lady();
        }
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
};
// image format change end

// image format and resize start
const resize_the_img = (req, res) => {
  try {
    let format = req.body.name;
    let width = parseInt(req.body.width);
    let height = parseInt(req.body.height);

    let img_quality, extType;

    switch (format) {
      case "jpg":
        img_quality = 40;
        extType = ".JPG";
        break;

      case "png":
        img_quality = 100;
        extType = ".PNG";
        break;

      case "bmp":
        img_quality = 70;
        extType = ".BMP";
        break;

      case "tiff":
        img_quality = 90;
        extType = ".TIFF";
        break;

      default:
        return res.send("<h1>Wrong image format choice!!!</h1>");
    }

    const allwedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".tiff"];
    const upload_file = req.files.file;
    const extensionName = path.extname(upload_file.name);
    // console.log(extensionName);
    const imgSize = upload_file.size / 1024 / 1024;
    if (imgSize > 11) {
      return res.status(413).send("File size is greater than 11MB");
    } else if (!allwedExtensions.includes(extensionName.toLowerCase())) {
      return res
        .status(422)
        .send(
          "Allowded Extensions of uploaded imgage are .png, .jpg, jpeg, .tiff, .bmp"
        );
    } else {
      let file_nam = `${uuidv4()}${Date.now()}_img`;
      let location = `../public/uploaded_file/${file_nam}${extensionName}`;
      let procesed_file;
      upload_file.mv(location, (err) => {
        if (err) {
          return res.status(500).send("<h1>File Not Converted");
        } else {
          procesed_file = `../public/procesed_file/result${file_nam}${extType}`;

          async function lady() {
            const img_result = await Jimp.read(location);

            if (!width && !height) {
              await img_result.quality(img_quality).writeAsync(procesed_file);
            } else if (!width) {
              await img_result
                .resize(Jimp.AUTO, height)
                .quality(img_quality)
                .writeAsync(procesed_file);
            } else if (!height) {
              await img_result
                .resize(width, Jimp.AUTO)
                .quality(img_quality)
                .writeAsync(procesed_file);
            } else {
              await img_result
                .resize(width, height)
                .quality(img_quality)
                .writeAsync(procesed_file);
            }

            fs.unlink(location, (err) => {});
            return res.status(200).send({url:`procesed_file/result${file_nam}${extType}`});
          }

          lady();
        }
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
};
// image format and resize end

// image black and white start
const black_and_white = (req, res) => {
  try {
    let format = req.body.name;

    let img_quality, extType;

    switch (format) {
      case "jpg":
        img_quality = 40;
        extType = ".JPG";
        break;

      case "png":
        img_quality = 100;
        extType = ".PNG";
        break;

      case "bmp":
        img_quality = 70;
        extType = ".BMP";
        break;

      case "tiff":
        img_quality = 90;
        extType = ".TIFF";
        break;

      default:
        return res.send("<h1>Wrong image format choice!!!</h1>");
    }

    const allwedExtensions = [".svg", ".jpg", ".jpeg", ".bmp", ".tiff", ".png"];
    const upload_file = req.files.file;
    const extensionName = path.extname(upload_file.name);
    // console.log(extensionName);
    const imgSize = upload_file.size / 1024 / 1024;
    if (imgSize > 11) {
      return res.status(413).send("File size is greater than 11MB");
    } else if (!allwedExtensions.includes(extensionName.toLowerCase())) {
      return res
        .status(422)
        .send(
          "Allowded Extensions of uploaded imgage are .png, .jpg, jpeg, .tiff, .bmp, .svg"
        );
    } else {
      let file_nam = `${uuidv4()}${Date.now()}_img`;
      let location = `../public/uploaded_file/${file_nam}${extensionName}`;
      let procesed_file;
      upload_file.mv(location, (err) => {
        if (err) {
          return res.status(500).send("<h1>File Not Converted</h1>");
        } else {
          procesed_file = `../public/procesed_file/result${file_nam}${extType.toUpperCase()}`;

          async function lady() {
            const img_result = await Jimp.read(location);
            await img_result
              .grayscale()
              .quality(img_quality)
              .writeAsync(procesed_file);
            // console.log(img_result);
            
            fs.unlink(location, (err)=>{});

            return res.status(200).send({url:`procesed_file/result${file_nam}${extType.toUpperCase()}`});
          }

          lady();
        }
      });
    }
  } catch (err) {
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
};
// image black and white end

// image black and white to color start
const B_W_COLOR = (req, res) => {
  try {
    let token_val;
    const allwedExtensions = [".jpg", ".jpeg", ".bmp", ".tiff", ".png"];

    const upload_file = req.files.img;
    const extensionName = path.extname(upload_file.name);
    // console.log(extensionName);
    const imgSize = upload_file.size / 1024 / 1024;
    if (imgSize > 11) {
      return res.status(413).send("File size is greater than 11MB");
    } else if (!allwedExtensions.includes(extensionName.toLowerCase())) {
      return res
        .status(422)
        .send(
          "Allowded Extensions of uploaded imgage are .png, .jpg, jpeg, .tiff, .bmp, .svg"
        );
    } else {
      let file_nam = uuidv4()+Date.now();
      let location = `../public/BW/${file_nam}${extensionName}`;
      upload_file.mv(location, async (err) => {
        if (err) {
          return res.status(500).send("<h1>File Not Converted</h1>");
        } else {
          token_val = jwt.sign({ foo: file_nam }, process.env.SECRET_KEY);

          res.cookie("colorimg", token_val, {
            httpOnly: true,
          });

          const data = new bwimage({
            token_val,
            file_name: `${file_nam}${extensionName}`,
          });
          await data.save();

          res.render("B_W_image", { url: `/BW/${file_nam}${extensionName}` });
        }
      });
    }
  } catch (err) {
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
};

const color_img = async (req, res) => {
  try {
    let uull;
    const token_val = req.cookies.colorimg;
    const data = await bwimage.findOne({ token_val });
    const { file_name } = data;
    const ran_name = uuidv4()+Date.now();
    const child = spawn(
      `python3 colorozie.py --image ../public/BW/${file_name} --name ${ran_name}`,
      [],
      {
        shell: true,
      }
    );
    child.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      // console.log(`stderr: ${data}`);
    });

    child.on("error", (error) => {
      // console.log(`error: ${error.message}`);
    });

    child.on("exit", async (code, signal) => {
      // if (code) console.log(`process exit with code : ${code}`);
      // if (signal) console.log(`process killed with signal : ${signal}`);
      // console.log("Done");
      uull = { url: `/color_img/${ran_name}.jpg` };
      await bwimage.deleteOne({ token_val });
      fs.unlink(`../public/BW/${file_name}`, (err)=>{});
      res.send(uull);
    });
  } catch (error) {
    res.status(502).send("<h1>Problem in Server</h1>");
  }
};

const delete_color_img_data = async (req, res) =>{
  const token_val = req.cookies.colorimg;
  const data = await bwimage.findOne({ token_val });
  if(data){
    await bwimage.deleteOne({ token_val });
    fs.unlink(`../public/BW/${data.file_name}`, (err)=>{});
    res.redirect("/convert-black-and-white-image-to-color-image");
  }else{
    res.redirect("/convert-black-and-white-image-to-color-image");
  }
}

// image black and white to color end

// crop image start

const crop_img_save = (req, res) =>{
  try {
    const allwedExtensions = [".jpg", ".jpeg", ".bmp", ".tiff", ".png"];
    const upload_file = req.files.file;
    const extensionName = path.extname(upload_file.name);
    // console.log(extensionName);
    const imgSize = upload_file.size / 1024 / 1024;
    if (imgSize > 11) {
      return res.status(413).send("File size is greater than 11MB");
    } else if (!allwedExtensions.includes(extensionName.toLowerCase())) {
      return res
        .status(422)
        .send(
          "Allowded Extensions of uploaded imgage are .png, .jpg, jpeg, .tiff, .bmp, .svg"
        );
    } else {
      let file_nam = `${uuidv4()+Date.now()}_img`;
      let location = `../public/crop_img/${file_nam}${extensionName}`;
      upload_file.mv(location, (err) => {
        if (err) {
          return res.status(500).send("<h1>File Not Converted</h1>");
        } else {
          res.send({
            url: `/crop_img/${file_nam}${extensionName}`,
          });
        }
      });
    }
  } catch (error) {
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
}

// crop image end

// compress image start

const save_com_file = (req, res) =>{
    try {

      const allwedExtensions = [".jpg", ".jpeg", ".bmp", ".tiff", ".png"];
      const input_file = req.files.file;
      const extensionName = path.extname(input_file.name);
      const imgSize = input_file.size / 1024 / 1024;
      let file_nam = `${uuidv4()+Date.now()}_img`;
      let location = `../public/com/${file_nam}.jpg`;
      if(allwedExtensions.includes(extensionName.toLowerCase()) && imgSize <= 11){
        input_file.mv(location, (err) => {
          if (err) {
            return res.status(500).send("<h1>File Not Converted</h1>");
          } else {
            res.send({img_url:`com/${file_nam}.jpg`});
          }
        });
      }


    } catch (error) {
      
    }
}
// compress image end

//download compress image start
const down_com_image = async (req, res) => {
  try {
    let img_name = "../public/"+req.body.filename;
    let comp_val = 100 - parseInt(req.body.com_val);
    let image_name = Date.now()+uuidv4()+".jpg";
    async function lady() {
      const img_result = await Jimp.read(img_name);

      await img_result
        .quality(comp_val)
        .writeAsync(`../public/com/${image_name}`);

      return res.send({ url: `/com/${image_name}` });
    }

    lady();

  } catch (error) {
    res.status(502).send("<h1>Problem in Server</h1>");
  }
};
// download compress image end

// image to pdf start

const image_to_pdf_save = async (req, res) =>{
  try {
    let img_files = req.files.imagess;
    console.log(img_files);
    const allwedExtensions = [".jpg", ".jpeg", ".bmp", ".tiff", ".png"];
    if (img_files.length) {
      const validate = img_files.every((eachImg) => {
        let extensionName = path.extname(eachImg.name);
        let imgSize = eachImg.size / 1024 / 1024;

        return (
          imgSize <= 11 &&
          allwedExtensions.includes(extensionName.toLowerCase())
        );
      });

      if (validate) {
        let array_of_fileNames = [];
        for(img of img_files){
          let location = `u_imgs/${uuidv4()}.jpg`;
          array_of_fileNames = array_of_fileNames.concat(location);
          await img.mv(`../public/${location}`, (err)=>{
            if(err){

            }else{
            }
          })
        }

        res.send({url:array_of_fileNames});
      }
    }else{
      let extensionName = path.extname(img_files.name);
      let imgSize = img_files.size / 1024 / 1024;

      if (imgSize <= 11 && allwedExtensions.includes(extensionName.toLowerCase())) {
          let location = `u_imgs/${uuidv4()}.jpg`;
          img_files.mv(`../public/${location}`, (err)=>{
            if(err){

            }else{
              res.send({url:location});
            }
          })      
      }
    }
  } catch (error) {
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
}

const make_pdf = async (req, res) => {
  try {
    const { file_name, portrait, landscape, img_position, page_size } = req.body;
    const pdf_name = uuidv4()+Date.now();
    const pdf_url = `/pdfs/${pdf_name}.pdf`;
    let p_size;
    switch (page_size) {
      case "A1":
        p_size = imgtopdf.sizes.A1;
        break;

      case "A2":
        p_size = imgtopdf.sizes.A2;
        break;

      case "A3":
        p_size = imgtopdf.sizes.A3;
        break;

      case "A4":
        p_size = imgtopdf.sizes.A4;
        break;

      case "A5":
        p_size = imgtopdf.sizes.A5;
        break;

      case "A6":
        p_size = imgtopdf.sizes.A6;
        break;

      case "A7":
        p_size = imgtopdf.sizes.A7;
        break;

      case "A8":
        p_size = imgtopdf.sizes.A8;
        break;

      case "A9":
        p_size = imgtopdf.sizes.A9;
        break;

      case "A10":
        p_size = imgtopdf.sizes.A10;
        break;
    }


    let ppdata = imgtopdf(file_name,portrait,landscape,img_position,p_size).pipe(fs.createWriteStream(`../public${pdf_url}`));

    ppdata.on("finish", () => {
      res.send({ pdf_url });
    });
  } catch (error) {
    res.status(502).send("<h1>Problem in Server</h1>");
  }
};

// image to pdf end

// pdf to image start

const pdf_to_image = (req, res) => {
  try {
    const pdf_file = req.files.pdf;
    const extensionName = path.extname(pdf_file.name);
    const pdf_size = pdf_file.size / 1024 / 1024;
    if (pdf_size < 50 && ".pdf".includes(extensionName.toLowerCase())) {
      const fil__nam = uuidv4()+Date.now();
      const pdf_lo = `pdf_to_image/${fil__nam}.pdf`;
      pdf_file.mv(`pdf_to_image/${fil__nam}.pdf`, async (err) => {
        if (err) {
          // console.log(err);
        } else {
          const pdfbuffer = fs.readFileSync(pdf_lo);
          const renderedPages = await gs.renderPDFPagesToPNG(pdfbuffer);
          const fold_nam = uuidv4()+Date.now();
          fs.mkdirSync(`extracted_images/${fold_nam}`, {
            recursive: true,
            force: true,
          });
          for (let i = 0; i < renderedPages.length; i++) {
            const nam = uuidv4()+Date.now();
            fs.writeFile(
              `extracted_images/${fold_nam}/${nam}.png`,
              renderedPages[i],
              (err) => {
                // console.log(err);
              }
            );
          }
          const zip_nam = "zip_" + uuidv4()+Date.now();
          const url = `../public/zip/${zip_nam}.zip`;
          await zip(`extracted_images/${fold_nam}`, url);
          fs.rm(`extracted_images/${fold_nam}`, { recursive: true }, (err) => {
            // console.log(err);
          });
          fs.unlink(pdf_lo, (err)=>{});
          res.render("download_ex_img", { url: `/zip/${zip_nam}.zip` });
        }
      });
    } else {
      res.status(415).send("<h1>Uploaded File exceeds the limit</h1>");
    }
  } catch (error) {
    res.status(415).send("<h1>Problem in File Processing</h1>");
  }
};
// pdf to image END

// pdf merger start
const pdf_merger = async (req, res) => {
  try {
    let array_of_fileNames = [];
    const pdfs = [];
    let token_val;
    const upload_file = req.files.pdf;
    if (upload_file.length) {
      const validate = upload_file.every((eachImg) => {
        let extensionName = path.extname(eachImg.name);
        let imgSize = eachImg.size / 1024 / 1024;

        return imgSize <= 40 && ".pdf".includes(extensionName.toLowerCase());
      });

      if (validate) {
        const random = uuidv4()+Date.now();
        token_val = jwt.sign({ foo: random }, process.env.SECRET_KEY);
        res.cookie("pdfmerge", token_val, {
          httpOnly: true,
        });
        const checkdone = await upload_file.map((eachImg, index) => {
          let file_nam = uuidv4()+Date.now();
          let extensionName = ".pdf";
          array_of_fileNames = array_of_fileNames.concat(
            file_nam + extensionName
          );
          let location = `pdf_merge/${file_nam}${extensionName}`;
          eachImg.mv(location, async (err) => {
            if (err) {
              return res.status(500).send("<h1>File Not Converted</h1>");
            } else {
              // console.log("file saved");
            }
          });
        });
        const data = new pdf_merge_imgs({
          token_val,
          img_names: array_of_fileNames,
        });
        await data.save();
        res.render("merge_pdf_user");
      } else {
        res.send("<h1>Sorry uploaded data was wrong!!</h1>");
      }
    }
  } catch (error) {
    res.status(502).send("<h1>Problem in Server</h1>");
  }
};

const get_pdf_merge_data = async (req, res, next) => {
  try {
    const token_val = req.cookies.pdfmerge;
    const data = await pdf_merge_imgs.findOne({ token_val });
    for (let i = 0; i < data.img_names.length; i++) {
      const ff = fs.readFileSync(`pdf_merge/${data.img_names[i]}`);
      const renderedPages = await gs.renderPDFPagesToPNG(ff, 1, 1);
      data.img_names[i] = data.img_names[i].replace(".pdf", "");
      fs.writeFileSync(
        `../public/pdf_im/${data.img_names[i]}.png`,
        renderedPages[0]
      );
      data.img_names[i] = data.img_names[i].concat(".png");
    }
    req.data = data;
    next();
  } catch (error) {
    next();
  }
};

const merge_pdf = async (req, res, next) => {
  try {
    const merger = new PDFMerger();
    const token_val = req.cookies.pdfmerge;
    const pdf_name = req.body.names;
    for (let i = 0; i < pdf_name.length; i++) {
      pdf_name[i] = "pdf_merge/" + pdf_name[i].replace(".png", ".pdf");
    }


    for(const file of pdf_name) {
      await merger.add(file);
    }

    const pdf_nam = `${uuidv4()+Date.now()}.pdf`;

    await merger.save(`../public/merged_pdf/${pdf_nam}`);

    const data = await pdf_merge_imgs.findOne({ token_val });
    if (data) {
      await pdf_merge_imgs.deleteOne({ token_val });
      const fil_nam = data.img_names;
      for (let i = 0; i < fil_nam.length; i++) {
        fil_nam[i] = fil_nam[i].replace(".pdf", "");
      }
      for (let i = 0; i < fil_nam.length; i++) {
        fs.unlink(`pdf_merge/${fil_nam[i]}.pdf`, (err) => {
          // console.log(err);
        });

        fs.unlink(`../public/pdf_im/${fil_nam[i]}.png`, (err) => {
          // console.log(err);
        });
      }
    }
    req.data = pdf_nam;
    next();
  } catch (error) {
    next();
  }
};

const delete_pdf_merge_data = async (req, res) => {
  try {
    const token_val = req.cookies.pdfmerge;
  const data = await pdf_merge_imgs.findOne({ token_val });
  if (data) {
    await pdf_merge_imgs.deleteOne({ token_val });
    const fil_nam = data.img_names;
    for (let i = 0; i < fil_nam.length; i++) {
      fil_nam[i] = fil_nam[i].replace(".pdf", "");
    }
    for (let i = 0; i < fil_nam.length; i++) {
      fs.unlink(`pdf_merge/${fil_nam[i]}.pdf`, (err) => {
        // console.log(err);
      });

      fs.unlink(`../public/pdf_im/${fil_nam[i]}.png`, (err) => {
        // console.log(err);
      });
    }
  }
  res.redirect("/pdf-merger");
  } catch (error) {
  res.redirect("/pdf-merger");
    
  }
  
};
// pdf merge end

// pdf compress start
const compress_pdf = (req, res) => {
  try {
    const pdf_file = req.files.pdf;
    const extensionName = path.extname(pdf_file.name);
    const pdf_size = pdf_file.size / 1024 / 1024;
    if (pdf_size < 50 && ".pdf".includes(extensionName.toLowerCase())) {
      const pdf_nam = uuidv4()+Date.now();
      const location = `comp_pdf/${pdf_nam}.pdf`;
      pdf_file.mv(location, async (err) => {
        if (err) {
          // console.log("file not saved");
        } else {
          const read_pdf_file = fs.readFileSync(location);
          const compressPDF = await gs.compressPDF(read_pdf_file);
          fs.unlink(`comp_pdf/${pdf_nam}.pdf`, (err) => {
            // if (err) console.log(err);
          });
          fs.writeFileSync(
            `../public/compressed_pdf/${pdf_nam}.pdf`,
            compressPDF
          );
          res
            .status(200)
            .render("download_compress_pdf", {
              url: `compressed_pdf/${pdf_nam}.pdf`,
            });
        }
      });
    } else {
      res.status(415).send("<h1>File is Invalid</h1>");
    }
  } catch (error) {
    res.status(502).send("<h1>Problem in Server</h1>");
    
  }
 
};

module.exports = {
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
};
