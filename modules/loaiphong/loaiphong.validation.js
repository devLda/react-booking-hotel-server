
const Joi = require('joi');

const updateSchema = Joi.object({
        IDLoaiPhong: Joi.string(),
        TenLoaiPhong: Joi.string(),})

const createSchema = Joi.object({
        IDLoaiPhong: Joi.string().required(),
        TenLoaiPhong: Joi.string().required(),})

module.exports = {
    createSchema,
    updateSchema
}

