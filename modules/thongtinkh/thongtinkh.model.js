const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ThongTinKHSchema = new mongoose.Schema({
    IDThongTinKH: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    TenKH: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    NgaySinh: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    SDT: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    CCCD: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    GioiTinh: {
        type: Boolean,
        required: true,
        unique: false,
        default: "",
    },
    
}, {
    timestamps: false
});

ThongTinKHSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ThongTinKH', ThongTinKHSchema);