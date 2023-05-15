const express = require("express");
const {
  getAll,
  remove,
  register,
  login,
  getAccessToken,
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

router.get("/", getAll);

router.delete("/delete/:id", [verifyAccessToken, isAdmin], remove);

router.post("/register", register);

router.get("/final-register/:token", finalRegister);

router.post("/login", login);

router.post("/loginAdmin", [verifyAccessToken, isAdmin], login);

// router.post("/login", [isAdmin], login);

router.get("/accesstoken", verifyAccessToken, getAccessToken);

router.post("/refreshtoken", verifyRefreshToken, refreshAccessToken);

router.get("/logout", logout);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword", resetPassword);

module.exports = router;
