const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ThongTinKHSchema = new mongoose.Schema(
  {
    HoaDon: {
      type: mongoose.Types.ObjectId,
      ref: "HoaDon"
    },
    Email: {
      type: String,
      required: true,
    },
    TenKH: {
      type: String,
      required: true,
    },
    SDT: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ThongTinKHSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ThongTinKH", ThongTinKHSchema);
