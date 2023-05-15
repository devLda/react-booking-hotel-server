const express = require("express");
const {
  create,
  getAll,
  getById,
  getMultiDataPhong,
  update,
  remove,
  getMultiAllData,
} = require("./phong.controller");
const router = express.Router();
const uploader = require("../../configs/cloudinary.config");

router.post("/add", uploader.array("images", 3), create);

router.get("/", getAll);

router.get("/multi/:pid", getMultiDataPhong);

router.get("/multiphong", getMultiAllData);

router.get("/id/:id", getById);

router.put("/:id", update);

router.delete("/delete/:id", remove);

module.exports = router;
