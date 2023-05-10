const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      default: "''",
    },
    Password: {
      type: String,
      required: true,
      unique: false,
      default: "''",
    },
    HoVaTen: {
      type: String,
      required: true,
      unique: false,
      default: "''",
    },
    NgaySinh: {
      type: Date,
      required: false,
      unique: false,
      default: null,
    },
    SDT: {
      type: String,
      required: true,
      unique: false,
      default: "''",
    },
    Email: {
      type: String,
      required: true,
      unique: false,
      default: "''",
    },
    CCCD: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    GioiTinh: {
      type: Boolean,
      required: false,
      unique: false,
      default: true,
    },
  },
  {
    timestamps: false,
  }
);

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
