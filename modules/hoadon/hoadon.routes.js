const express = require("express");
const control = require("./hoadon.controller");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../../middleware/verifyToken");

router.post("/add", [verifyAccessToken, isAdmin], control.create);

router.get("/", control.getAll);

router.get("/multidata", control.getHD_DP_KH);

router.get("/staticdv", control.staticDV);

router.get("/statictong", control.staticTotal);

router.get("/get/:id", control.getHD);

router.put("/update/:id", control.update);

router.put("/huydv/:id", control.huydv);

router.put("/updatett/:id", control.updatett);

module.exports = router;
