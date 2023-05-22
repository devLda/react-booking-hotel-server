const express = require("express");
const {
  create,
  getAll,
  getHD,
  getList,
  update,
  remove,
  uploadSingleImage,
  getHD_DP_KH,
  // uploadMultiImage,
} = require("./hoadon.controller");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../../middleware/verifyToken");

router.post("/add", [verifyAccessToken, isAdmin], create);

router.get("/", getAll);

router.get("/multidata", getHD_DP_KH);

router.get("/list", getList);

router.get("/get/:id", getHD);

router.put("/update/:id", [verifyAccessToken, isAdmin], update);

router.post("/uploadimage", uploadSingleImage);

// router.post("/uploadmultiimage", uploadMultiImage);

module.exports = router;
