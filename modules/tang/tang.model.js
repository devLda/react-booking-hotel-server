const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const TangSchema = new mongoose.Schema(
  {
    IDTang: {
      type: String,
      required: true,
      unique: true,
    },
    TenTang: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

TangSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Tang", TangSchema);
