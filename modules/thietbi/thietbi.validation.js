
const Joi = require('joi');

const updateSchema = Joi.object({
        IDThietBi: Joi.string(),
        TenThietBi: Joi.string(),})

const createSchema = Joi.object({
        IDThietBi: Joi.string().required(),
        TenThietBi: Joi.string().required(),})

module.exports = {
    createSchema,
    updateSchema
}

