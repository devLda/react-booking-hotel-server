const express = require("express");
const control = require("./dichvu.controller");
const router = express.Router();
const { isAdmin, verifyAccessToken } = require("../../middleware/verifyToken");

router.post("/add", [verifyAccessToken, isAdmin], control.create);

router.get("/", control.getAll);

router.get("/all", [verifyAccessToken, isAdmin], control.getAll);

router.get("/get/:MaDichVu", control.getOne);

router.put("/update/:MaDichVu", [verifyAccessToken, isAdmin], control.update);

router.delete(
  "/delete/:MaDichVu",
  [verifyAccessToken, isAdmin],
  control.remove
);

module.exports = router;
