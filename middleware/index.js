const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const globalMiddelwares = (app, dir) => {
  app.use("/public", express.static(path.join(dir, "public")));
  app.use(
    cors({
      origin: true,
      methods: ["POST", "PUT", "GET", "DELETE"],
      credentials: true,
    })
  );
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use("/api/user", require("../modules/user"));
  app.use("/api/loaiphong", require("../modules/loaiphong"));
  app.use("/api/tang", require("../modules/tang"));
  app.use("/api/thietbi", require("../modules/thietbi"));
  app.use("/api/phong", require("../modules/phong"));
  app.use("/api/thietbiphong", require("../modules/thietbiphong"));
  app.use("/api/datphong", require("../modules/datphong"));
  app.use("/api/thongtinkh", require("../modules/thongtinkh"));
  app.use("/api/hoadon", require("../modules/hoadon"));
  app.use("/api/chitiethd", require("../modules/chitiethd"));
  app.use("/api/dichvu", require("../modules/dichvu"));
  app.use("/api/baiviet", require("../modules/baiviet"));
};

module.exports = globalMiddelwares;
