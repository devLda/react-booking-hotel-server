
const Joi = require('joi');

const updateSchema = Joi.object({
        IDPhong: Joi.string(),
        IDLoaiPhong: Joi.string(),
        IDTang: Joi.string(),
        IDBaiViet: Joi.number(),
        SoNguoi: Joi.number(),
        TinhTrang: Joi.boolean(),
        DienTich: Joi.number(),
        GiaPhong: Joi.number(),})

const createSchema = Joi.object({
        IDPhong: Joi.string().required(),
        IDLoaiPhong: Joi.string().required(),
        IDTang: Joi.string().required(),
        IDBaiViet: Joi.number().required(),
        SoNguoi: Joi.number(),
        TinhTrang: Joi.boolean().required(),
        DienTich: Joi.number().required(),
        GiaPhong: Joi.number().required(),})

module.exports = {
    createSchema,
    updateSchema
}

