const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ThongTinKHSchema = new mongoose.Schema(
  {
    IDThongTinKH: {
      type: String,
      required: true,
      unique: true,
    },
    TenKH: {
      type: String,
      required: true,
    },
    NgaySinh: {
      type: String,
      required: true,
    },
    SDT: {
      type: String,
      required: true,
    },
    CCCD: {
      type: String,
      required: true,
    },
    GioiTinh: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ThongTinKHSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ThongTinKH", ThongTinKHSchema);
