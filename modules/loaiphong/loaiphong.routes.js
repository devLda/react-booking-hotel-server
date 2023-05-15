const express = require("express");
const {
  create,
  getAll,
  getById,
  getList,
  update,
  remove,
  uploadImage,
} = require("./loaiphong.controller");
const router = express.Router();
const uploader = require("../../configs/cloudinary.config");

router.post("/add", uploader.single("File"), create);

router.get("/", getAll);

router.get("/list", getList);

router.get("/id/:id", getById);

router.put("/update/:id", update);

router.delete("/delete/:id", remove);

router.put("/uploadimage/:pid", uploader.array("images", 3), uploadImage);

module.exports = router;
