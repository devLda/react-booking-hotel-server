const HoaDon = require("./hoadon.model");
const DichVu = require("../dichvu/dichvu.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");

const create = asyncHandler(async (req, res) => {
  const { IDDatPhong, IDKH } = req.body;

  if (!IDDatPhong || !IDKH) throw new Error("Thiếu trường dữ liệu");

  const item = await HoaDon.findOne({ DatPhong: IDDatPhong, ThongTinKH: IDKH });

  if (item) throw new Error("Hoá đơn đã tồn tại");
  else {
    const newLoai = await HoaDon.create(req.body);
    return res.status(200).json({
      success: newLoai ? true : false,
      mes: newLoai ? newLoai : "Đã xảy ra lỗi",
    });
  }
});

const getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await HoaDon.find(query);

    return res.status(200).json({
      success: result ? true : false,
      data: result,
    });
  } catch (err) {
    console.error("HoaDon getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

const getHD_DP_KH = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const multiData = await HoaDon.find(query)
    .populate("DatPhong", "NgayBatDau NgayKetThuc")
    .populate("ThongTinKH", "TenKH SDT Email");
  return res.status(200).json({
    success: multiData ? true : false,
    data: multiData ? multiData : "Đã xảy ra lỗi",
  });
});

const getHD = asyncHandler(async (req, res) => {
  const { TenLoaiPhong } = req.params;

  if (!TenLoaiPhong) throw new Error("Thiếu trường dữ liệu");

  const result = await HoaDon.findOne({ TenLoaiPhong });
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

    const result = await HoaDon.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("HoaDon list failed: " + err);
    errorHandler(err, res, req);
  }
};

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const request = req.body;

  if (!id) throw new Error("Không tìm thấy hóa đơn!");

  if (request.length === 0) throw new Error("Chưa có dịch vụ nào được thêm!!!");

  const response = await HoaDon.findById(id);

  const dvHoaDon = response.DichVu;

  request.forEach((element) => {
    let count = 0;
    if (dvHoaDon.length > 0)
      for (let i in dvHoaDon) {
        if (dvHoaDon[i].MaDichVu === element.MaDichVu) {
          count++;
          dvHoaDon[i].SoLuong += element.SoLuong;
        }

        if (count === 0 && parseFloat(i) === dvHoaDon.length - 1) {
          dvHoaDon.push(element);
        }
      }
    else {
      dvHoaDon.push(element);
    }
  });

  // request.forEach(element => {
  //   if(dvHoaDon.some( item => item.MaDichVu === element.MaDichVu))
  // });

  // await response.save()

  return res.status(200).json({
    // success: response ? true : false,
    success: request,
    // mes: response ? response : "Đã xảy ra lỗi",
    mes: dvHoaDon,
  });
});

const remove = async (req, res) => {
  try {
    const { TenLoaiPhong } = req.params;

    const findLP = await HoaDon.findOne({ TenLoaiPhong: TenLoaiPhong });
    //retrieve current image ID
    let imgId = findLP.images[0].split("AnhOctHotel/")[1];
    imgId = "AnhOctHotel/" + imgId.split(".")[0];
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    await HoaDon.findOneAndUpdate(
      {
        TenLoaiPhong: TenLoaiPhong,
      },
      { $pop: { images: -1 } }
    );

    const result = await HoaDon.findOneAndDelete({
      TenLoaiPhong: TenLoaiPhong,
    });
    return res.status(200).json({
      success: result ? true : false,
      mes: result ? "Xoá loại phòng thành công" : "Đã có lỗi xảy ra",
    });
  } catch (err) {
    console.error("HoaDon delete failed: " + err);
    errorHandler(err, res, req);
  }
};

const uploadSingleImage = asyncHandler(async (req, res) => {
  // const { TenLoaiPhong } = req.params;
  const { TenLoaiPhong, image, isCre } = req.body;

  if (!isCre) {
    const findLP = await HoaDon.findOne({ TenLoaiPhong: TenLoaiPhong });
    //retrieve current image ID
    let imgId = findLP.images[0].split("AnhOctHotel/")[1];
    imgId = "AnhOctHotel/" + imgId.split(".")[0];
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    await HoaDon.findOneAndUpdate(
      {
        TenLoaiPhong: TenLoaiPhong,
      },
      { $pop: { images: -1 } }
    );
  }

  const result = await cloudinary.uploader.upload(image, {
    folder: "AnhOctHotel",
  });
  const phongUpdate = await HoaDon.findOneAndUpdate(
    { TenLoaiPhong: TenLoaiPhong },
    { $push: { images: result.secure_url } },
    { new: true }
  );

  return res.status(200).json({
    success: phongUpdate ? true : false,
    mes: phongUpdate ? phongUpdate : "Đã xảy ra lỗi",
  });
});

// const uploadMultiImage = asyncHandler(async (req, res) => {
//   const { image } = req.body;
//   const result = await cloudinary.uploader.upload(image, {
//     folder: "AnhOctHotel",
//   });
//   return res.status(200).json({
//     success: result ? true : false,
//     mes: result ? result : "Đã xảy ra lỗi",
//   });
// });

module.exports = {
  create,
  getAll,
  getHD_DP_KH,
  getHD,
  getList,
  update,
  remove,
  uploadSingleImage,
  // uploadMultiImage,
};
