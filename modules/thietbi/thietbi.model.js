const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ThietBiSchema = new mongoose.Schema({
    IDThietBi: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    TenThietBi: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    
}, {
    timestamps: false
});

ThietBiSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ThietBi', ThietBiSchema);