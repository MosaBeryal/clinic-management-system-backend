const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const consultationFilesController = require("../controllers/consultationFileUploadController");

router.post(
  "/",
  upload.single("file"),
  consultationFilesController.uploadFile
);
router.get("/", consultationFilesController.getFiles);

module.exports = router;
