const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TangSchema = new mongoose.Schema({
    TenTang: {
        type: String,
        required: true,
        default: "Tầng 1",
    },
    
}, {
    timestamps: false
});

TangSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Tang', TangSchema);