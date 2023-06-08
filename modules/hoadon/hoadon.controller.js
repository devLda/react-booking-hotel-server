const HoaDon = require("./hoadon.model");
const DatPhong = require("../datphong/datphong.model");
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

const filterDV = (hoadons) => {
  const tempHD = [];

  for (const element of hoadons) {
    let count = 0;
    if (element.DichVu.length > 0) {
      for (const item of element.DichVu) {
        if (tempHD.length > 0) {
          if (tempHD.some((ele) => ele.MaDichVu === item.MaDichVu)) {
          }
        } else {
          count++;
          tempHD.push({
            label: item.TenDichVu,
            count: count,
          });
        }
      }
    }

    if (count > 0) {
      tempRoom.push({
        label: item.MaPhong,
        value: count,
      });
    }
  }
  return tempRoom;
};

const staticDV = asyncHandler(async (req, res) => {
  const response = await HoaDon.find({}).populate(
    "DatPhong",
    "NgayBatDau NgayKetThuc",
    {
      NgayBatDau: {
        $regex: /-06-/,
      },
      NgayKetThuc: {
        $regex: /-06-/,
      },
    }
  );

  const filterHD = [];
  for (let i in response) {
    if (response[i].DatPhong === null) continue;
    filterHD.push(response[i]);
  }
  // const result = filterDV(filterHD);

  return res.status(200).json(filterHD);
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const request = req.body;

  if (!id) throw new Error("Không tìm thấy hóa đơn!");

  if (request.length === 0) throw new Error("Chưa có dịch vụ nào được thêm!!!");

  const response = await HoaDon.findById(id);

  const dvHoaDon = response.DichVu;

  const dpHoaDon = await DatPhong.findById(response.DatPhong).populate(
    "Phong",
    "GiaPhong"
  );

  let tongTien = dpHoaDon?.TongNgay * dpHoaDon?.Phong?.GiaPhong;

  request.forEach((element) => {
    let count = 0;
    if (dvHoaDon.length > 0)
      for (let i in dvHoaDon) {
        if (dvHoaDon[i].MaDichVu === element.MaDichVu) {
          count++;
          dvHoaDon[i].SoLuong += element.SoLuong;
          tongTien += dvHoaDon[i].SoLuong * dvHoaDon[i].GiaDichVu;
        }

        if (count === 0 && parseFloat(i) === dvHoaDon.length - 1) {
          tongTien += element.SoLuong * element.GiaDichVu;
          dvHoaDon.push(element);
        }
      }
    else {
      tongTien += element.SoLuong * element.GiaDichVu;
      dvHoaDon.push(element);
    }
  });

  response.DichVu = dvHoaDon;
  response.TongTien = tongTien;
  await response.save();

  return res.status(200).json({
    success: response ? true : false,
    // success: request,
    mes: response ? response : "Đã xảy ra lỗi",
    // mes: dpHoaDon,
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

module.exports = {
  create,
  getAll,
  getHD_DP_KH,
  getHD,
  staticDV,
  update,
  remove,
};
