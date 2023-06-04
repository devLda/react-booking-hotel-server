const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const DichVuSchema = new mongoose.Schema(
  {
    MaDichVu: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    TenDichVu: {
      type: String,
      required: true,
    },
    GiaDichVu: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

DichVuSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("DichVu", DichVuSchema);
