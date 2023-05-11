const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LoaiPhongSchema = new mongoose.Schema({
    TenLoaiPhong: {
        type: String,
        required: true,
        default: "Deluxe Room",
    },
    MoTa: {
        type: String,
        default: "",
    }
    
}, {
    timestamps: false
});

LoaiPhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('LoaiPhong', LoaiPhongSchema);