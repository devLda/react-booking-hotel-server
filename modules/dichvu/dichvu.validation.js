
const Joi = require('joi');

const updateSchema = Joi.object({
        IDDichVu: Joi.string(),
        TenDichVu: Joi.string(),
        GiaDichVu: Joi.number(),})

const createSchema = Joi.object({
        IDDichVu: Joi.string().required(),
        TenDichVu: Joi.string().required(),
        GiaDichVu: Joi.number().required(),})

module.exports = {
    createSchema,
    updateSchema
}

