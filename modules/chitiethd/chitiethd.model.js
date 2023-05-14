const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ChiTietHDSchema = new mongoose.Schema(
  {
    IDChiTietHoaDon: {
      type: String,
      required: true,
      unique: true,
    },
    IDHoaDon: {
      type: mongoose.Types.ObjectId,
      ref: "HoaDon",
    },
    IDDichVu: {
      type: mongoose.Types.ObjectId,
      ref: "DichVu",
    },
    SoLuong: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ChiTietHDSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ChiTietHD", ChiTietHDSchema);
