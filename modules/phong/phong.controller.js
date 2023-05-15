const Phong = require("./phong.model");
const LoaiPhong = require("../loaiphong/loaiphong.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");

const create = async (req, res) => {
  try {
    const { IDPhong, IDLoaiPhong } = req.body;

    if (!req.files) throw new Error("Ảnh bị lỗi!!!");

    if (!IDPhong || !IDLoaiPhong)
      return res.status(400).json({
        success: false,
        mes: "Dữ liệu đầu vào bị lỗi!!!",
      });

    const phong = await Phong.findOne({ IDPhong });
    const loaiphong = await LoaiPhong.findById(IDLoaiPhong);

    if (!loaiphong) throw new Error("Loại phòng không tồn tại");

    if (phong) throw new Error("Phòng đã tồn tại");
    else {
      const data = req.body;
      data.images = req.files.map((item) => item.path);

      const newPhong = await Phong.create(data);
      return res.status(200).json({
        success: newPhong ? true : false,
        mes: newPhong ? newPhong : "Đã xảy ra lỗi!!!",
      });
    }
  } catch (err) {
    console.error("Phong creation failed: " + err);
    errorHandler(err, res, req);
  }
};

const getAll = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const result = await Phong.find(query);

  return res.status(200).json({
    success: result ? true : false,
    phong: result ? result : "Đã xảy ra lỗi",
  });
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Không tìm thấy phòng!!!");
  const result = await Phong.findById(id);

  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi",
  });
});

// const excludedFields = "-refreshToken -password -role -createdAt -updatedAt";
const fieldsLoaiPhong = "_id TenLoaiPhong";
const getMultiDataPhong = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  const multiData = await Phong.findById(pid).populate(
    "IDLoaiPhong",
    fieldsLoaiPhong
  );
  return res.status(200).json({
    success: multiData ? true : false,
    data: multiData,
  });
});

const getMultiAllData = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const multiData = await Phong.find(query).populate(
    "LoaiPhong",
    fieldsLoaiPhong
  );
  return res.status(200).json({
    success: multiData ? true : false,
    data: multiData,
  });
});

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Phong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong update failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Phong" });
  }
};

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Không tìm thấy người dùng!");
  const result = await Phong.findByIdAndDelete(id);
  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi!!!",
  });
});

module.exports = {
  create,
  getAll,
  getById,
  getMultiDataPhong,
  getMultiAllData,
  update,
  remove,
};
