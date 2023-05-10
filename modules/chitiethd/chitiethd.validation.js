
const Joi = require('joi');

const updateSchema = Joi.object({
        IDChiTietHoaDon: Joi.string(),
        IDHoaDon: Joi.string(),
        IDDichVu: Joi.string(),
        SoLuong: Joi.number(),})

const createSchema = Joi.object({
        IDChiTietHoaDon: Joi.string().required(),
        IDHoaDon: Joi.string().required(),
        IDDichVu: Joi.string().required(),
        SoLuong: Joi.number().required(),})

module.exports = {
    createSchema,
    updateSchema
}

