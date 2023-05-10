
const Joi = require('joi');

const updateSchema = Joi.object({
        IDHoaDon: Joi.string(),
        IDDatPhong: Joi.string(),
        TongTien: Joi.number().default(0),
        NgayThanhToan: Joi.date(),})

const createSchema = Joi.object({
        IDHoaDon: Joi.string().required(),
        IDDatPhong: Joi.string().required(),
        TongTien: Joi.number().default(0),
        NgayThanhToan: Joi.date().required(),})

module.exports = {
    createSchema,
    updateSchema
}

