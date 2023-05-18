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
// const uploader = require("../../configs/cloudinary.config");
const {isAdmin, verifyAccessToken} = require("../../middleware/verifyToken")

router.post("/add",[verifyAccessToken, isAdmin], create);

router.get("/", getAll);

router.get("/multi/:pid", getMultiDataPhong);

router.get("/multiphong", getMultiAllData);

router.get("/id/:id", getById);

router.put("/update/:id",[verifyAccessToken, isAdmin], update);

router.delete("/delete/:id",[verifyAccessToken, isAdmin], remove);

module.exports = router;
