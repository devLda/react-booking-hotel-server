const Loaiphong = require("./loaiphong.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../configs/cloudinary.config");

const create = asyncHandler(async (req, res) => {
  const { TenLoaiPhong } = req.body;

  if (!TenLoaiPhong) throw new Error("Thiếu trường dữ liệu");

  const item = await Loaiphong.findOne({ TenLoaiPhong });

  if (item) throw new Error("Loại phòng đã tồn tại");
  else {
    const data = req.body;

    data.TienNghi = req.body.TienNghi.split(",");

    const newLoai = await Loaiphong.create(data);
    return res.status(200).json({
      success: newLoai ? true : false,
      mes: newLoai ? newLoai : "Đã xảy ra lỗi",
    });
  }
});

const getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Loaiphong.find(query);

    return res.status(200).json({
      success: result ? true : false,
      data: result,
    });
  } catch (err) {
    console.error("Loaiphong getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

const getLP = asyncHandler(async (req, res) => {
  const { TenLoaiPhong } = req.params;

  if (!TenLoaiPhong) throw new Error("Thiếu trường dữ liệu");

  const result = await Loaiphong.findOne({ TenLoaiPhong });
  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi",
  });
});

const getList = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortField, sortOrder } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: {},
    };

    if (sortField && sortOrder) {
      options.sort = {
        [sortField]: sortOrder,
      };
    }

    const result = await Loaiphong.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong list failed: " + err);
    errorHandler(err, res, req);
  }
};

const update = asyncHandler(async (req, res) => {
  const { TenLoaiPhong } = req.body;

  if (!TenLoaiPhong) throw new Error("Không tìm thấy loại phòng!");

  const data = req.body;

  data.TienNghi = req.body.TienNghi.split(",");

  const response = await Loaiphong.findOneAndUpdate(
    { TenLoaiPhong: TenLoaiPhong },
    data,
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "Đã xảy ra lỗi",
  });
});

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Loaiphong.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong delete failed: " + err);
    errorHandler(err, res, req);
  }
};

const uploadImage = asyncHandler(async (req, res) => {
  const { TenLoaiPhong } = req.params;
  console.log(req.body);
  // if (!req.file) throw new Error("Ảnh bị lỗi!!!");
  // const response = await Loaiphong.findByIdAndUpdate(
  //   TenLoaiPhong,
  //   {
  //     images: req.file.path,
  //   },
  //   { new: true }
  // );
  // return res.status(200).json({
  //   status: response ? true : false,
  //   mes: response ? response : "Không thể upload ảnh",
  // });
});

module.exports = {
  create,
  getAll,
  getLP,
  getList,
  update,
  remove,
  uploadImage,
};
