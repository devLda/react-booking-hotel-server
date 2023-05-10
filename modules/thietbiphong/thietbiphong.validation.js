
const Joi = require('joi');

const updateSchema = Joi.object({
        IDThietBiPhong: Joi.string(),
        IDThietBi: Joi.string(),
        IDPhong: Joi.string(),
        SoLuong: Joi.number(),})

const createSchema = Joi.object({
        IDThietBiPhong: Joi.string().required(),
        IDThietBi: Joi.string().required(),
        IDPhong: Joi.string().required(),
        SoLuong: Joi.number().required(),})

module.exports = {
    createSchema,
    updateSchema
}

