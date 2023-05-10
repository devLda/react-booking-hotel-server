const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ChiTietHDSchema = new mongoose.Schema({
    IDChiTietHoaDon: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    IDHoaDon: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    IDDichVu: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    SoLuong: {
        type: Number,
        required: true,
        unique: false,
        default: "",
    },
    
}, {
    timestamps: true
});

ChiTietHDSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ChiTietHD', ChiTietHDSchema);