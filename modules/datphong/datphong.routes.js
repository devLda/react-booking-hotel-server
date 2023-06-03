const express = require("express");
const control = require("./datphong.controller");
const router = express.Router();
const { isAdmin, verifyAccessToken } = require("../../middleware/verifyToken");

router.post("/add", control.create);

router.get("/", [verifyAccessToken, isAdmin], control.getAll);

router.get("/multidata", control.getMultiAllData);

router.get("/list", control.getList);

router.get("/static", control.getStatic);

router.get("/:id", control.getById);

router.put("/cancel", control.cancelBooking)

router.put("/:id", control.update);

router.delete("/:id", [verifyAccessToken, isAdmin], control.remove);

module.exports = router;
