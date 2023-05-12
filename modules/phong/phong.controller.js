const Phong = require("./phong.model");
const Tang = require("../tang/tang.model")
const LoaiPhong = require("../loaiphong/loaiphong.model")
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const { IDPhong, IDTang, IDLoaiPhong } = req.body;

    if (!IDPhong || !IDTang || !IDLoaiPhong)
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const phong = await Phong.findOne({ IDPhong });
    const tang = await Tang.findById(IDTang);
    const loaiphong = await LoaiPhong.findById(IDLoaiPhong);

    if(!tang) throw new Error ("Tầng không tồn tại");
    if(!loaiphong) throw new Error ("Loại phòng không tồn tại");

    if (phong) throw new Error("Phòng đã tồn tại");
    else {
      const newPhong = await Phong.create(req.body);
      return res.status(200).json({
        success: newPhong ? true : false,
        mes: newPhong,
      });
    }
  } catch (err) {
    console.error("Tang creation failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Phong.find(query);

    return res.status(200).json({
      success: result ? true : false,
      phong: result
    });
  } catch (err) {
    console.error("Phong getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Phong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong getById failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Phong" });
  }
};

module.exports.getList = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortField, sortOrder } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: {},
    };

    if (sortField && sortOrder) {
      options.sort = {
        [sortField]: sortOrder,
      };
    }

    const result = await Phong.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong list failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Phong" });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Phong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong update failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Phong" });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Phong.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong delete failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Phong" });
  }
};
