const DichVu = require("./dichvu.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");

const create = asyncHandler(async (req, res) => {
  const { MaDichvu, TenDichVu, GiaDichVu } = req.body;

  if (!MaDichvu || !TenDichVu || !GiaDichVu)
    throw new Error("Thiếu trường dữ liệu!");

  const newDichVu = await DichVu.create({
    MaDichVu: MaDichvu,
    TenDichVu: TenDichVu,
    GiaDichVu: GiaDichVu,
  });

  return res.status(200).json({
    success: newDichVu ? true : false,
    mes: newDichVu ? newDichVu : "Đã xảy ra lỗi!!!",
  });
});

const getAll = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const result = await DichVu.find(query);

  return res.status(200).json({
    success: result ? true : false,
    data: result ? result : "Đã xảy ra lỗi",
  });
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const result = await DichVu.findById(id);

    return res.status(200).json(result);
});

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Datphong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong update failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Datphong.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong delete failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
