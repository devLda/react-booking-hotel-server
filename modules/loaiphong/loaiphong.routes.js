const express = require('express');
const { create, getAll, getById, getList, update, remove} = require('./loaiphong.controller');
const router = express.Router();

router.post('/add', create);

router.get('/', getAll);

router.get('/list', getList);

router.get('/id/:id', getById);

router.put('/update/:id', update);

router.delete('/delete/:id', remove);

module.exports = router;