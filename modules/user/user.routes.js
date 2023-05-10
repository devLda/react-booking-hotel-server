const express = require("express");
const {
  create,
  getAll,
  getById,
  getList,
  update,
  remove,
  register,
  login,
  getCurrent,
} = require("./user.controller");

const { verifyAccessToken } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/add", create);

// router.get("/", getAll);

// router.get("/list", getList);

// router.get("/:Username", getById);

router.put("/:Username", update);

router.delete("/:Username", remove);

router.post("/register", register);

router.post("/login", login);

router.get("/current", verifyAccessToken, getCurrent);

module.exports = router;
