const express = require("express");
const {
  create,
  getAll,
  getMultiAllData,
  getById,
  getList,
  update,
  remove,
  getStatic,
} = require("./datphong.controller");
const router = express.Router();
const { isAdmin, verifyAccessToken } = require("../../middleware/verifyToken");

router.post("/add", create);

router.get("/", [verifyAccessToken, isAdmin], getAll);

router.get("/multidata", getMultiAllData);

router.get("/list", getList);

router.get("/static", getStatic);

router.get("/:id", getById);

router.put("/:id", update);

router.delete("/:id", [verifyAccessToken, isAdmin], remove);

module.exports = router;
