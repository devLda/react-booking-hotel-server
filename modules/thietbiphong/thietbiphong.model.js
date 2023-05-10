const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ThietBiPhongSchema = new mongoose.Schema({
    IDThietBiPhong: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    IDThietBi: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    IDPhong: {
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
    timestamps: false
});

ThietBiPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ThietBiPhong', ThietBiPhongSchema);