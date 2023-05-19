const Datphong = require("./datphong.model");
const PhongMD = require("../phong/phong.model");
const ThongTinKH = require("../thongtinkh/thongtinkh.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51N9Nf4CcdPVMLpZJ6pe5UNmwcPnyCUXCakjwNuLEeP6tZkHGWc6K8Rb8CRKUSiMC56BRDCOrjQzQuPwEPHEcylbK00bb14mNbU"
);
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../utils/sendMail");

module.exports.create = asyncHandler(async (req, res) => {
  const {
    Phong,
    NgayBatDau,
    NgayKetThuc,
    TongNgay,
    TongTien,
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
    if (!findPhong) throw new Error("Không tìm thấy phòng đã chọn");
    else {
      const newKH = new ThongTinKH({
        GiaoDich: payment.id,
        Email: Email,
        TenKH: TenKH,
        SDT: SDT,
      });
      const KH = await newKH.save();

      const newBook = new Datphong({
        Phong: Phong,
        ThongTinKH: KH._id,
        GiaoDich: payment.id,
        NgayBatDau: moment(NgayBatDau, "DD-MM-YYYY").format("DD-MM-YYYY"),
        NgayKetThuc: moment(NgayKetThuc, "DD-MM-YYYY").format("DD-MM-YYYY"),
        TongNgay: TongNgay,
      });

      const booking = await newBook.save();

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
          Xin chào quý khách hàng
        Cảm ơn quý khách hàng đã sử dụng dịch vụ của khách sạn chúng tôi – Anh Oct Hotel.
        Chúng tôi rất hân hạnh xác nhận rằng quý đã đặt 1 phòng đơn từ ngày ${NgayBatDau} đến ${NgayKetThuc}
        và quý khách đã thanh toán 30% số tiền đặt cọc. Email này là xác thực của quý khách khi check-in
        Nếu có bất cứ thắc mắc gì vui lòng liên hệ với chúng tôi qua số máy: +849028888888
        Chúng tôi mong đợi được đón tiếp quý khách.
          Trân trọng.
    </p>`;

      const data = {
        Email,
        html,
        subject: "Xác nhận đặt phòng - AnhOct Hotel",
      };

      const rs = await sendMail(data);
      return res.status(200).json({
        success: booking ? true : false,
        mes: booking ? booking : "Đã xảy ra lỗi!!!",
      });
    }
  }
});

// const newKH = new ThongTinKH({
//   Email: Email,
//   TenKH: TenKH,
//   SDT: SDT,
// });
// const KH = await newKH.save()

// const newBook = new Datphong({
//   Phong: Phong,
//   ThongTinKH: KH._id,
//   GiaoDich: "6465d1b10c8890a2a5b19050",
//   NgayBatDau: moment(NgayBatDau, "DD-MM-YYYY").format("DD-MM-YYYY"),
//   NgayKetThuc: moment(NgayKetThuc, "DD-MM-YYYY").format("DD-MM-YYYY"),
//   TongNgay: TongNgay,
// });

// const booking = await newBook.save()

// findPhong.LichDat.push({
//   DatPhong: booking._id,
//   NgayBatDau: moment(NgayBatDau, "DD-MM-YYYY").format("DD-MM-YYYY"),
//   NgayKetThuc: moment(NgayKetThuc, "DD-MM-YYYY").format("DD-MM-YYYY"),
//   KhachHang: KH._id,
//   TrangThai: booking.TrangThai
// });
// return res.status(200).json({
//   success: booking ? true : false,
//   mes: booking ? booking : "Đã xảy ra lỗi!!!"
// });

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Datphong.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong getAll failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

module.exports.getById = async (req, res) => {
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

module.exports.getList = async (req, res) => {
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

module.exports.update = async (req, res) => {
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

module.exports.remove = async (req, res) => {
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
