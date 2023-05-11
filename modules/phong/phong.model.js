const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PhongSchema = new mongoose.Schema({
    loaiphong: {
        type: mongoose.Types.ObjectId,
        ref: 'LoaiPhong'
    },
    tang: {
        type: mongoose.Types.ObjectId,
        ref: 'Tang'
    },
    images: {
        type: Array
    },
    SoNguoi: {
        type: Number,
        default: 0,
    },
    TinhTrang: {
        type: Boolean,
        required: true,
        default: true,
    },
    DienTich: {
        type: Number,
        required: true,
        default: 20,
    },
    GiaPhong: {
        type: Number,
        required: true,
        default: 500,
    },
    ratings: [
        {
            star: {type: Number},
            postedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
            comment: {type: String}
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
    
}, {
    timestamps: true
});

PhongSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Phong', PhongSchema);