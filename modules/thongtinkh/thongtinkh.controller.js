const Thongtinkh = require("./thongtinkh.model");
const HoaDon = require("../hoadon/hoadon.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");

const create = asyncHandler(async (req, res) => {
  const { Email } = req.body;

  if (!Email)
    return res.status(400).json({
      success: false,
      mes: "Dữ liệu đầu vào bị lỗi",
    });
  const newKH = await Thongtinkh.create(req.body);
  return res.status(200).json({
    success: newKH ? true : false,
    mes: newKH,
  });
});

const getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Thongtinkh.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thongtinkh.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh getById failed: " + err);
    errorHandler(err, res, req);
  }
};

const getBooking = async (req, res) => {
  const { Email } = req.params;
  if (!Email) throw new Error("Đã có lỗi xảy ra");

  const findKH = await Thongtinkh.findOne({ Email: Email });

  if (!findKH) {
    return res.status(200).json({
      success: true,
      mes: "Bạn không có đơn đặt phòng nào",
    });
  } else {
    const findHD = await HoaDon.find({ ThongTinKH: findKH._id }).populate(
      "DatPhong",
      "NgayBatDau NgayKetThuc"
    );
    return res.status(200).json({
      success: findHD ? true : false,
      data: findHD ? findHD : "Đã xảy ra lỗi",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thongtinkh.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh update failed: " + err);
    errorHandler(err, res, req);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Thongtinkh.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh delete failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getBooking,
  update,
  remove,
};
