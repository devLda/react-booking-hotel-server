
const Joi = require('joi');

const updateSchema = Joi.object({
        IDTang: Joi.string(),
        TenTang: Joi.string(),})

const createSchema = Joi.object({
        IDTang: Joi.string().required(),
        TenTang: Joi.string().required(),})

module.exports = {
    createSchema,
    updateSchema
}

