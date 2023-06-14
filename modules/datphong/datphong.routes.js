const express = require("express");
const control = require("./datphong.controller");
const router = express.Router();
const { isAdmin, verifyAccessToken } = require("../../middleware/verifyToken");

router.post("/adddp", control.create);

router.post("/add", control.autoCreate);

router.get("/", [verifyAccessToken, isAdmin], control.getAll);

router.get("/multidata", control.getMultiAllData);

router.get("/list", control.getList);

router.get("/static", control.getStaticDashboard);

router.get("/:id", control.getById);

router.put("/cancel", control.cancelBooking);

router.put("/updateday/:id", control.update);

router.delete("/:id", [verifyAccessToken, isAdmin], control.remove);

module.exports = router;
