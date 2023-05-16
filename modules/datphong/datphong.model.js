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
    LichDat: {
      type: Array,
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
