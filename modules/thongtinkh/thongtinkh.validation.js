
const Joi = require('joi');

const updateSchema = Joi.object({
        IDThongTinKH: Joi.string(),
        TenKH: Joi.string(),
        NgaySinh: Joi.string(),
        SDT: Joi.string(),
        CCCD: Joi.string(),
        GioiTinh: Joi.boolean(),})

const createSchema = Joi.object({
        IDThongTinKH: Joi.string().required(),
        TenKH: Joi.string().required(),
        NgaySinh: Joi.string().required(),
        SDT: Joi.string().required(),
        CCCD: Joi.string().required(),
        GioiTinh: Joi.boolean().required(),})

module.exports = {
    createSchema,
    updateSchema
}

