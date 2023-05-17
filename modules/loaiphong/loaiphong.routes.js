const express = require("express");
const {
  create,
  getAll,
  getLP,
  getList,
  update,
  remove,
  uploadImage,
} = require("./loaiphong.controller");
const router = express.Router();
const uploader = require("../../configs/cloudinary.config");
const { verifyAccessToken, isAdmin } = require("../../middleware/verifyToken");

router.post("/add", [verifyAccessToken, isAdmin], create);

router.get("/", [verifyAccessToken, isAdmin], getAll);

router.get("/list", [verifyAccessToken, isAdmin], getList);

router.get("/get/:TenLoaiPhong", getLP);

router.put("/update/:TenLoaiPhong", [verifyAccessToken, isAdmin], update);

router.delete("/delete/:TenLoaiPhong", [verifyAccessToken, isAdmin], remove);

router.put("/uploadimage/:TenLoaiPhong", uploadImage);

module.exports = router;
