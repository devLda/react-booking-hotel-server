const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const DatPhongSchema = new mongoose.Schema({
    IDDatPhong: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    IDPhong: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    IDThongTinKH: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    NgayBatDau: {
        type: Date,
        required: true,
        unique: false,
        default: "''",
    },
    NgayKetThuc: {
        type: Date,
        required: true,
        unique: false,
        default: "''",
    },
    TrangThaiDat: {
        type: Boolean,
        required: true,
        unique: false,
        default: "",
    },
    
}, {
    timestamps: false
});

DatPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('DatPhong', DatPhongSchema);