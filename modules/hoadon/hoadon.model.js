const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const HoaDonSchema = new mongoose.Schema(
  {
    IDHoaDon: {
      type: String,
      required: true,
      unique: true,
    },
    IDDatPhong: {
      type: mongoose.Types.ObjectId,
      ref: "DatPhong",
    },
    TongTien: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

HoaDonSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("HoaDon", HoaDonSchema);
