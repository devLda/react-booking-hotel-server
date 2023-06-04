const Datphong = require("./dichvu.model");
const PhongMD = require("../phong/phong.model");
const HoaDon = require("../hoadon/hoadon.model");
const ThongTinKH = require("../thongtinkh/thongtinkh.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51N9Nf4CcdPVMLpZJ6pe5UNmwcPnyCUXCakjwNuLEeP6tZkHGWc6K8Rb8CRKUSiMC56BRDCOrjQzQuPwEPHEcylbK00bb14mNbU"
);
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../utils/sendMail");

const create = asyncHandler(async (req, res) => {
  const {
    Phong,
    NgayBatDau,
    NgayKetThuc,
    TongNgay,
    MaPhong,
    DaThanhToan,
    TenKH,
    SDT,
    Email,
    token,
  } = req.body;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const payment = await stripe.charges.create(
    {
      amount: DaThanhToan * 100,
      customer: customer.id,
      currency: "usd",
      receipt_email: token.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  if (payment) {
    if (!Phong || !NgayBatDau || !NgayKetThuc || !TenKH || !SDT || !Email)
      throw new Error("Thiếu dữ liệu đầu vào!!!");

    const findPhong = await PhongMD.findById(Phong);

    const findKH = await ThongTinKH.findOne({
      Email: Email,
      TenKH: TenKH,
      SDT: SDT,
    });
    if (!findPhong) throw new Error("Không tìm thấy phòng đã chọn");
    else {
      let KH;
      if (!findKH) {
        const newKH = new ThongTinKH({
          Email: Email,
          TenKH: TenKH,
          SDT: SDT,
        });
        KH = await newKH.save();
      } else {
        KH = findKH;
      }

      const newBook = new Datphong({
        Phong: Phong,
        ThongTinKH: KH._id,
        NgayBatDau: moment(NgayBatDau, "DD-MM-YYYY").format("DD-MM-YYYY"),
        NgayKetThuc: moment(NgayKetThuc, "DD-MM-YYYY").format("DD-MM-YYYY"),
        TongNgay: TongNgay,
        TrangThai: "Đã đặt",
      });

      const booking = await newBook.save();

      await HoaDon.create({
        DatPhong: booking._id,
        ThongTinKH: KH._id,
        GiaoDich: {
          MaGD: payment.id,
          DaThanhToan: DaThanhToan,
          NgayThanhToan: moment().format("hh:mm:ss A DD-MM-YYYY"),
        },
        TongTien: (DaThanhToan * 10) / 3,
        TrangThai: "Đã đặt cọc",
      });

      const roomtemp = await PhongMD.findOne({ _id: Phong });

      roomtemp.LichDat.push({
        DatPhong: booking._id,
        NgayBatDau: moment(NgayBatDau, "DD-MM-YYYY").format("DD-MM-YYYY"),
        NgayKetThuc: moment(NgayKetThuc, "DD-MM-YYYY").format("DD-MM-YYYY"),
        KhachHang: KH._id,
        TrangThai: booking.TrangThai,
      });
      await roomtemp.save();

      const html = `<p style="font-size: 16px;">
        Kính chào quý khách hàng ${TenKH},<br/>
      Cảm ơn quý khách hàng đã đặt phòng tại khách sạn chúng tôi – Anh Oct Luxury Hotel.<br/>
      Chúng tôi xác nhận rằng quý đã đặt 1 phòng với số phòng <b> ${MaPhong} </b> từ ngày <b> ${NgayBatDau} </b> đến <b> ${NgayKetThuc} </b>
      và quý khách đã thanh toán <b> ${DaThanhToan} $ </b> tương ứng với 30% số tiền đặt cọc. Email này là xác thực của quý khách khi check-in.<br/>
      Nếu có bất cứ thắc mắc gì vui lòng liên hệ với chúng tôi qua số máy: +84988888888.<br/>
      Chúng tôi mong đợi được đón tiếp quý khách.<br/>
        Trân trọng.<br/>
        <i> AnhOct Luxury Hotel </i>
  </p>`;

      const data = {
        Email,
        html,
        subject: "Xác nhận đặt phòng - AnhOct Luxury Hotel",
      };

      const rs = await sendMail(data);
      return res.status(200).json({
        success: newBook ? true : false,
        mes: newBook ? booking : "Đã xảy ra lỗi!!!",
      });
    }
  }
});

const getAll = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const result = await Datphong.find(query);

  return res.status(200).json({
    success: result ? true : false,
    data: result ? result : "Đã xảy ra lỗi",
  });
});

const getMultiAllData = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const multiData = await Datphong.find(query)
    .populate("Phong", "MaPhong _id")
    .populate("ThongTinKH", "TenKH SDT Email");
  return res.status(200).json({
    success: multiData ? true : false,
    data: multiData,
  });
});

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Datphong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong getById failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
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

    const result = await Datphong.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong list failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

const getStatic = asyncHandler(async (req, res) => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const year = today.getFullYear() + "";
  const month =
    today.getMonth() < 10
      ? "0" + (today.getMonth() + 1)
      : "" + (today.getMonth() + 1);
  const fday =
    firstDay.getDate() < 10
      ? "0" + firstDay.getDate()
      : "" + firstDay.getDate();
  const lday =
    lastDay.getDate() < 10 ? "0" + lastDay.getDate() : "" + lastDay.getDate();

  const regexMonth = new RegExp(`-${month}-`);
  // console.log(month);
  const DonDatThang = await Datphong.count({
    NgayBatDau: {
      $regex: regexMonth,
    },
    NgayKetThuc: {
      $regex: regexMonth,
    },
  });

  const gteThang = `${year}-${month}-${fday}`;
  const ltThang = `${year}-${month}-${lday}`;
  const KHThang = await ThongTinKH.count({
    createdAt: {
      $gte: new moment(gteThang),
      $lt: new moment(ltThang),
    },
  });

  const ToTal = await HoaDon.aggregate([
    {
      $match: {
        TrangThai: {
          $eq: "Đã đặt cọc",
        },
      },
    },
    {
      $group: {
        _id: null,
        total_tongtien: { $sum: "$TongTien" },
      },
    },
  ]);

  const orderline = await Datphong.find({})
    .populate("Phong", "MaPhong")
    .populate("ThongTinKH", "TenKH");

  const TotalThang = await HoaDon.aggregate([
    {
      $match: {
        TrangThai: {
          $eq: "Đã đặt cọc",
        },
        createdAt: {
          $gte: new Date(`${year}-${month}-${fday}T00:00:01.983+00:00`),
          $lt: new Date(`${year}-${month}-${lday}T23:59:59.983+00:00`),
        },
      },
    },
    {
      $group: {
        _id: null,
        total_tongtien: { $sum: "$TongTien" },
      },
    },
  ]);

  return res.status(200).json({
    donthang: DonDatThang,
    khthang: KHThang,
    total: ToTal,
    totalthang: TotalThang,
    orderline: orderline,
  });
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { IdHoaDon, IdDatPhong } = req.body;
  if (!IdHoaDon || !IdDatPhong) throw new Error("Đơn đặt đã không còn tồn tại");

  // const datphong = await DatPhong.findByIdAndUpdate(IdDatPhong, {
  //   TrangThai: "Đã hủy"
  // }, {
  //   new: true
  // })
  const datphong = await Datphong.findByIdAndUpdate(
    IdDatPhong,
    {
      TrangThai: "Đã hủy",
    },
    {
      new: true,
    }
  );
  const hoadon = await HoaDon.findByIdAndUpdate(
    IdHoaDon,
    {
      TrangThai: "Đã hủy",
    },
    {
      new: true,
    }
  );
  const phong = await PhongMD.findById(datphong.Phong);

  const temp = phong?.LichDat.filter((item) => {
    if (item.DatPhong.toString() !== datphong._id.toString()) return item;
  });

  phong.LichDat = temp;
  phong.save();

  return res.status(200).json({
    success: phong ? true : false,
    data: phong,
  });
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
  getMultiAllData,
  getById,
  getList,
  getStatic,
  cancelBooking,
  update,
  remove,
};
