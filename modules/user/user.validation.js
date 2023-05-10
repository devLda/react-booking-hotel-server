
const Joi = require('joi');

const updateSchema = Joi.object({
        Username: Joi.string(),
        Password: Joi.string(),
        HoVaTen: Joi.string(),
        NgaySinh: Joi.date(),
        SDT: Joi.string(),
        Email: Joi.string(),
        CCCD: Joi.string(),
        GioiTinh: Joi.boolean(),})

const createSchema = Joi.object({
        Username: Joi.string().required(),
        Password: Joi.string().required(),
        HoVaTen: Joi.string().required(),
        NgaySinh: Joi.date().required(),
        SDT: Joi.string().required(),
        Email: Joi.string().required(),
        CCCD: Joi.string(),
        GioiTinh: Joi.boolean(),})

module.exports = {
    createSchema,
    updateSchema
}

