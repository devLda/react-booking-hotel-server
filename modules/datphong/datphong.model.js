const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const DatPhongSchema = new mongoose.Schema(
  {
    Phong: {
      type: mongoose.Types.ObjectId,
      ref: "Phong",
    },
    ThongTinKH: {
      type: mongoose.Types.ObjectId,
      ref: "ThongTinKH",
    },
    GiaoDich: {
      type: mongoose.Types.ObjectId,
      ref: "GiaoDich",
    },
    NgayBatDau: {
      type: String,
      required: true,
    },
    NgayKetThuc: {
      type: String,
      required: true,
    },
    TongNgay: {
      type: Number,
    },
    TrangThai: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

DatPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("DatPhong", DatPhongSchema);
