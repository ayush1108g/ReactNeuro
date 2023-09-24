const express = require("express");
const multer = require("multer");
const router = express.Router();

const fileController = require("../controllers/fileupload");

const upload = multer({ dest: "./uploads" });

router.post("/upload-file", upload.single("file"), fileController.uploadFile );

module.exports = router;