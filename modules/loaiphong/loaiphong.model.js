const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LoaiPhongSchema = new mongoose.Schema(
  {
    IDLoaiPhong: {
      type: String,
      required: true,
      unique: true,
    },
    TenLoaiPhong: {
      type: String,
      required: true,
    },
    MoTa: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

LoaiPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("LoaiPhong", LoaiPhongSchema);
