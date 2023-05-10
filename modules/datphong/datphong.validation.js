
const Joi = require('joi');

const updateSchema = Joi.object({
        IDDatPhong: Joi.string(),
        IDPhong: Joi.string(),
        IDThongTinKH: Joi.string(),
        NgayBatDau: Joi.date(),
        NgayKetThuc: Joi.date(),
        TrangThaiDat: Joi.boolean(),})

const createSchema = Joi.object({
        IDDatPhong: Joi.string().required(),
        IDPhong: Joi.string().required(),
        IDThongTinKH: Joi.string().required(),
        NgayBatDau: Joi.date().required(),
        NgayKetThuc: Joi.date().required(),
        TrangThaiDat: Joi.boolean().required(),})

module.exports = {
    createSchema,
    updateSchema
}

