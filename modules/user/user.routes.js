const express = require("express");
const {
  create,
  getAll,
  getById,
  getList,
  update,
  remove,
} = require("./user.controller");
const router = express.Router();

router.post("/add", create);

router.get("/", getAll);

router.get("/list", getList);

router.get("/:Username", getById);

router.put("/:Username", update);

router.delete("/:Username", remove);

module.exports = router;
