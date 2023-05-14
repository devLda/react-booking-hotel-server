const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PhongSchema = new mongoose.Schema(
  {
    IDPhong: {
      type: String,
      unique: true,
      required: true,
    },
    IDLoaiPhong: {
      type: mongoose.Types.ObjectId,
      ref: "LoaiPhong",
    },
    IDTang: {
      type: mongoose.Types.ObjectId,
      ref: "Tang",
    },
    images: {
      type: Array,
    },
    SoNguoi: {
      type: Number,
      required: true,
    },
    TinhTrang: {
      type: Boolean,
      required: true,
    },
    DienTich: {
      type: Number,
      required: true,
    },
    GiaPhong: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Phong", PhongSchema);
