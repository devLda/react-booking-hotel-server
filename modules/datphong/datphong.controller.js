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
      if (findKH) {
        const updateKH = await ThongTinKH.findOne({
          Email: Email,
          TenKH: TenKH,
          SDT: SDT,
        });
        updateKH.GiaoDich.push({
          MaGD: payment.id,
          NgayGD: moment().format("hh:mm:ss DD-MM-YYYY"),
          SoTien: DaThanhToan,
        });
        KH = await updateKH.save();
      } else {
        const newKH = new ThongTinKH({
          GiaoDich: {
            MaGD: payment.id,
            NgayGD: moment().format("hh:mm:ss DD-MM-YYYY"),
            SoTien: DaThanhToan,
          },
          Email: Email,
          TenKH: TenKH,
          SDT: SDT,
        });
        KH = await newKH.save();
      }

      const newBook = new Datphong({
        Phong: Phong,
        ThongTinKH: KH._id,
        NgayBatDau: moment(NgayBatDau, "DD-MM-YYYY").format("DD-MM-YYYY"),
        NgayKetThuc: moment(NgayKetThuc, "DD-MM-YYYY").format("DD-MM-YYYY"),
        TongNgay: TongNgay,
        TrangThai: "Booked",
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
