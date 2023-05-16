const Loaiphong = require("./loaiphong.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../configs/cloudinary.config");

const create = async (req, res) => {
  try {
    const { TenLoaiPhong, MoTa, image } = req.body;

    if (!TenLoaiPhong) throw new Error("Thiếu trường dữ liệu");

    if (!image) throw new Error("Vui lòng tải lại ảnh");

    const arrImages = image.split("@@@");

    const upload = await cloudinary.uploader.upload(arrImages, {
      folder: "AnhOctHotel",
    });

    // const newLP = await Loaiphong.create({
    //   TenLoaiPhong,
    //   MoTa,
    //   $push: { images: {} }
    // })

    return res.status(200).json({
      success: upload ? true : false,
      mes: upload.secure_url,
    });

    // const { IDLoaiPhong } = req.params;

    // if (!IDLoaiPhong)
    //   return res.status(400).json({
    //     success: false,
    //     mes: "Missing input",
    //   });

    // const item = await Loaiphong.findOne({ IDLoaiPhong });

    // if (item) throw new Error("Loại phòng đã tồn tại");
    // else {
    //   const data = req.body;
    //   data.TienNghi = req.body.TienNghi.split(",");
    //   const newLoai = await Loaiphong.create(data);
    //   return res.status(200).json({
    //     success: newLoai ? true : false,
    //     mes: newLoai,
    //   });
    // }
  } catch (err) {
    console.error("Loaiphong creation failed: " + err);
    errorHandler(err, res, req);
  }
};

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

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Loaiphong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong getById failed: " + err);
    errorHandler(err, res, req);
  }
};

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

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Loaiphong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong update failed: " + err);
    errorHandler(err, res, req);
  }
};

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
  const { pid } = req.params;
  if (!req.files) throw new Error("Ảnh bị lỗi!!!");
  const response = await Loaiphong.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updateProduct: response ? response : "Không thể upload ảnh",
  });
});

module.exports = {
  create,
  getAll,
  getById,
  getList,
  update,
  remove,
  uploadImage,
};
