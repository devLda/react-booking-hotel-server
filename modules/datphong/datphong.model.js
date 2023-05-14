const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const DatPhongSchema = new mongoose.Schema(
  {
    IDDatPhong: {
      type: String,
      required: true,
      unique: true,
    },
    IDPhong: {
      type: mongoose.Types.ObjectId,
      ref: "Phong",
    },
    IDThongTinKH: {
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
    TrangThaiDat: {
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
