
const Joi = require('joi');

const updateSchema = Joi.object({
        IDBaiViet: Joi.string(),
        IDPhong: Joi.string(),
        HinhAnh: Joi.string(),
        BinhLuan: Joi.string(),})

const createSchema = Joi.object({
        IDBaiViet: Joi.string().required(),
        IDPhong: Joi.string().required(),
        HinhAnh: Joi.string(),
        BinhLuan: Joi.string(),})

module.exports = {
    createSchema,
    updateSchema
}

