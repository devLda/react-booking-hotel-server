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
  refreshAccessToken,
  logout,
  resetPassword,
  forgotPassword,
  finalRegister,
} = require("./user.controller");

const {
  verifyAccessToken,
  verifyRefreshToken,
  isAdmin,
} = require("../../middleware/verifyToken");

const router = express.Router();

// router.post("/add", create);

router.get("/", [verifyAccessToken, isAdmin], getAll);

// router.get("/list", getList);

// router.get("/:Username", getById);

// router.put("/:Username", update);

router.delete("/:Username", [verifyAccessToken, isAdmin], remove);

router.post("/register", register);

router.get("/final-register/:token", finalRegister);

router.post("/login", login);

router.post("/loginAdmin", [verifyAccessToken, isAdmin], login);

// router.post("/login", [isAdmin], login);

router.get("/current", verifyAccessToken, getCurrent);

router.post("/refreshtoken", verifyRefreshToken, refreshAccessToken);

router.get("/logout", logout);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword", resetPassword);

module.exports = router;
