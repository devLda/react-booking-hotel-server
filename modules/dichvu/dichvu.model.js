const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const DichVuSchema = new mongoose.Schema({
    IDDichVu: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    TenDichVu: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    GiaDichVu: {
        type: Number,
        required: true,
        unique: false,
        default: "",
    },
    
}, {
    timestamps: false
});

DichVuSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('DichVu', DichVuSchema);