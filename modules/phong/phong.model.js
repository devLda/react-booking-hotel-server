const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PhongSchema = new mongoose.Schema({
    IDPhong: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    IDLoaiPhong: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    IDTang: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    IDBaiViet: {
        type: Number,
        required: true,
        unique: false,
        default: "",
    },
    SoNguoi: {
        type: Number,
        required: false,
        unique: false,
        default: "",
    },
    TinhTrang: {
        type: Boolean,
        required: true,
        unique: false,
        default: "",
    },
    DienTich: {
        type: Number,
        required: true,
        unique: false,
        default: "",
    },
    GiaPhong: {
        type: Number,
        required: true,
        unique: false,
        default: "",
    },
    
}, {
    timestamps: false
});

PhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Phong', PhongSchema);