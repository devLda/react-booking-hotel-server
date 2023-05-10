const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TangSchema = new mongoose.Schema({
    IDTang: {
        type: String,
        required: true,
        unique: true,
        default: "''",
    },
    TenTang: {
        type: String,
        required: true,
        unique: false,
        default: "''",
    },
    
}, {
    timestamps: false
});

TangSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Tang', TangSchema);