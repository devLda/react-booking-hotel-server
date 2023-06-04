const Phong = require("./phong.model");
const LoaiPhong = require("../loaiphong/loaiphong.model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../configs/cloudinary.config");

const create = asyncHandler(async (req, res) => {
  const { IDLoaiPhong, Tang, SoPhong, SoNguoi, DienTich, GiaPhong } = req.body;

  if (!IDLoaiPhong || !Tang || !SoPhong || !SoNguoi || !DienTich || !GiaPhong)
    return res.status(400).json({
      success: false,
      mes: "Thiếu trường dữ liệu",
    });

  const loaiphong = await LoaiPhong.findById(IDLoaiPhong);

  if (!loaiphong) throw new Error("Loại phòng không tồn tại");

  const newPhong = await Phong.create(req.body);
  return res.status(200).json({
    success: newPhong ? true : false,
    mes: newPhong ? newPhong : "Đã xảy ra lỗi!!!",
  });
});

const getAll = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const result = await Phong.find(query);

  return res.status(200).json({
    success: result ? true : false,
    data: result ? result : "Đã xảy ra lỗi",
  });
});

const getPhong = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Không tìm thấy phòng!!!");
  const result = await Phong.findById(id);

  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi",
  });
});

// const excludedFields = "-refreshToken -password -role -createdAt -updatedAt";
const fieldsLoaiPhong = "_id TenLoaiPhong TienNghi";
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

const update = asyncHandler(async (req, res) => {
  const { id, LoaiPhong } = req.body;

  if (!LoaiPhong) throw new Error("Không tìm thấy loại phòng!");

  const loaiphong = await LoaiPhong.findById(LoaiPhong);

  if (!loaiphong) throw new Error("Loại phòng không tồn tại");

  const data = req.body;

  const response = await Phong.findByIdAndUpdate(
    id,
    {
      SoPhong: data.SoPhong,
      Tang: data.Tang,
      LoaiPhong: data.LoaiPhong,
      SoNguoi: data.SoNguoi,
      DienTich: data.DienTich,
      GiaPhong: data.GiaPhong,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "Đã xảy ra lỗi",
  });
});

const remove = asyncHandler(async (req, res) => {
  const { id, images } = req.params;

  if (!images) throw new Error("Không tìm thấy phòng");
  const arrImgId = images.split(",");
  if (arrImgId?.length > 0)
    for (let i = 1; i < arrImgId?.length; i++) {
      let item = arrImgId[i].split("AnhOctHotel/")[1];
      item = "AnhOctHotel/" + arrImgId[i]?.split(".")[0];
      if (item) {
        await cloudinary.uploader.destroy(item);
      }
    }
  await Phong.findByIdAndUpdate(id, { $set: { images: [] } });

  if (!id) throw new Error("Không tìm thấy phòng");
  const result = await Phong.findByIdAndDelete(id);
  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi!!!",
  });
});

const uploadSingleImage = asyncHandler(async (req, res) => {
  // const { TenLoaiPhong } = req.params;
  const { id, image, isCre } = req.body;

  if (!isCre) {
    const findLP = await Phong.findById(id);
    //retrieve current image ID
    let imgId = findLP.images[0].split("AnhOctHotel/")[1];
    imgId = "AnhOctHotel/" + imgId.split(".")[0];
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    await Phong.findByIdAndUpdate(id, { $pop: { images: -1 } });
  }

  const result = await cloudinary.uploader.upload(image, {
    folder: "AnhOctHotel",
  });
  const phongUpdate = await Phong.findByIdAndUpdate(
    id,
    { $push: { images: result.secure_url } },
    { new: true }
  );

  return res.status(200).json({
    success: phongUpdate ? true : false,
    mes: phongUpdate ? phongUpdate : "Đã xảy ra lỗi",
  });
});

module.exports = {
  create,
  getAll,
  getPhong,
  getMultiDataPhong,
  getMultiAllData,
  update,
  remove,
  uploadSingleImage,
};
