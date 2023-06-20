const express = require("express");
const routes = express.Router();
const resumeControler = require("../controlers/resumeControler");
const UploadModel = require("../models/uploadModel");
const multer = require("multer");
const fs = require("fs");

/**
 * Creating Multer Storage Object
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

routes.post("/new-upload", resumeControler.upload);
routes.get("/uploaded/:id", resumeControler.getOneWithID);

/**
 *  @desc   Multer Upload Route
 *  @route  POST /api/v1/dashboard/resume/uploadWithMulter
 *  @access Private
 */

routes
  .route("/uploadWithMulter")
  .post(upload.single("file"), async function (req, res, next) {
    const saveImage = UploadModel({
      name: Date.now().toString(36) + "_" + req.file?.originalname || "noName",
      size: req.file?.size,
      uploadTime: Date.now(),
      fileData: {
        data: fs.readFileSync(`uploads/` + req.file?.originalname),
        contentType: req.file?.mimetype || "image/png",
      },
    });

    const id = await saveImage
      .save()
      .then((res) => {
        console.log("file is saved");
        return res._id;
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
    res.status(201).json({ id });
  });

module.exports = routes;