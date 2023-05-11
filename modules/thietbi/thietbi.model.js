const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ThietBiSchema = new mongoose.Schema(
  {
    IDThietBi: {
      type: String,
      required: true,
      unique: true,
    },
    TenThietBi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

ThietBiSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ThietBi", ThietBiSchema);
