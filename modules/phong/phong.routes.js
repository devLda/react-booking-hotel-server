const express = require("express");
const control = require("./phong.controller");
const router = express.Router();
// const uploader = require("../../configs/cloudinary.config");
const { isAdmin, verifyAccessToken } = require("../../middleware/verifyToken");

router.post("/add", [verifyAccessToken, isAdmin], control.create);

router.get("/", control.getAll);

router.get("/multi/:pid", control.getMultiDataPhong);

router.get("/multiphong", control.getMultiAllData);

router.get("/maphong/:MaPhong", control.getPhong);

router.get("/static", control.getStaticPhong);

router.put("/update/:id", [verifyAccessToken, isAdmin], control.update);

router.delete("/delete/:id", [verifyAccessToken, isAdmin], control.remove);

router.post("/uploadimage", control.uploadSingleImage);

module.exports = router;
