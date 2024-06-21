const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const host = "159.89.233.147";
const port = 8080;

const static_foldfer = path.join(__dirname, "../public");
const template_folder = path.join(__dirname, "../pages");

app.use(express.static(static_foldfer));

app.use(
  cors({
    origin: "https://localhost:8080",
    credentials: true,
  })
);

app.use(cookieParser());

// user and password file
dotenv.config({ path: "../config.env" });

app.set("view engine", "pug");
app.set("views", template_folder);

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 51200 * 51200, // 50mb
    },

    abortOnLimit: true,
  })
);
app.use(require("../router/express_router"));

app.listen(8080, () => {
  console.log("server running");
});

const dir_path = [
  "../public/BW/",
  "../public/color_img/",
  "../public/com/",
  "../public/compressed_pdf",
  "../public/crop_img/",
  "../public/merged_pdf/",
  "../public/pdf_im/",
  "../public/pdfs/",
  "../public/u_imgs/",
  "../public/zip/",
  __dirname + "/comp_pdf/",
  __dirname + "/extracted_images/",
  __dirname + "/pdf_merge/",
  __dirname + "/pdf_to_image/",
  __dirname + "/pdf_to_image/",
  __dirname + "/procesed_file/",
  __dirname + "/uploaded_file/",
];

const interval = setInterval(function () {
  for (let i = 0; i < dir_path.length; i++) {
    walkDir(dir_path[i], function (filePath) {
      fs.stat(filePath, function (err, stat) {
        var now = new Date().getTime();
        var endTime = new Date(stat.mtime).getTime() + 2400000; // 40 minutes in miliseconds

        if (err) {
          return console.error(err);
        }

        if (now > endTime) {
          //console.log('DEL:', filePath);
          return fs.unlink(filePath, function (err) {
            if (err) return console.error(err);
          });
        }
      });
    });
  }
}, 1200000); // 40 minutes in miliseconds

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}
