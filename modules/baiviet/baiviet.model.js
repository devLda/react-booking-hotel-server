const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const BaiVietSchema = new mongoose.Schema(
  {
    IDBaiViet: {
      type: String,
      required: true,
      unique: true,
    },
    IDPhong: {
      type: mongoose.Types.ObjectId,
      ref: "Phong",
    },
    images: {
      type: Array,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

BaiVietSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("BaiViet", BaiVietSchema);
