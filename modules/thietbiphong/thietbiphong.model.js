const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ThietBiPhongSchema = new mongoose.Schema(
  {
    IDThietBiPhong: {
      type: String,
      required: true,
      unique: true,
    },
    IDThietBi: {
      type: mongoose.Types.ObjectId,
      ref: "ThietBi",
    },
    IDPhong: {
      type: mongoose.Types.ObjectId,
      ref: "Phong",
    },
    SoLuong: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

ThietBiPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ThietBiPhong", ThietBiPhongSchema);
