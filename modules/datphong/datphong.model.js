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
    NgayBatDau: {
      type: Date,
      required: true,
    },
    NgayKetThuc: {
      type: Date,
      required: true,
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
