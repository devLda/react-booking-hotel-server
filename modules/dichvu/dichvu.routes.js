const express = require("express");
const control = require("./dichvu.controller");
const router = express.Router();
const { isAdmin, verifyAccessToken } = require("../../middleware/verifyToken");

router.post("/add", control.create);

router.get("/", control.getAll);

router.get("/:id", control.getById);

router.put("/:id", control.update);

router.delete("/:id", [verifyAccessToken, isAdmin], control.remove);

module.exports = router;
