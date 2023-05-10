const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BaiVietSchema = new mongoose.Schema({
    IDBaiViet: {
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
    HinhAnh: {
        type: String,
        required: false,
        unique: false,
        default: "''",
    },
    BinhLuan: {
        type: String,
        required: false,
        unique: false,
        default: "''",
    },
    
}, {
    timestamps: true
});

BaiVietSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('BaiViet', BaiVietSchema);