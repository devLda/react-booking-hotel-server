const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const HoaDonSchema = new mongoose.Schema({
    IDHoaDon: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    IDDatPhong: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    TongTien: {
        type: Number,
        required: false,
        unique: false,
        default: "0",
    },
    NgayThanhToan: {
        type: Date,
        required: true,
        unique: false,
        default: "''",
    },
    
}, {
    timestamps: false
});

HoaDonSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('HoaDon', HoaDonSchema);