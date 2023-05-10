const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LoaiPhongSchema = new mongoose.Schema({
    IDLoaiPhong: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    TenLoaiPhong: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    
}, {
    timestamps: false
});

LoaiPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('LoaiPhong', LoaiPhongSchema);