const Loaiphong = require("./loaiphong.model");
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const { IDLoaiPhong } = req.body;

    if (!IDLoaiPhong)
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const item = await Loaiphong.findOne({ IDLoaiPhong });

    if (item) throw new Error("Tên loại phòng đã tồn tại");
    else {
      const newLoai = await Loaiphong.create(req.body);
      console.log(newLoai);
      return res.status(200).json({
        success: newLoai ? true : false,
        mes: newLoai,
      });
    }
  } catch (err) {
    console.error("Loaiphong creation failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Loaiphong.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Loaiphong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong getById failed: " + err);
    errorHandler(err, res, req);
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

    const result = await Loaiphong.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong list failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Loaiphong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong update failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Loaiphong.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Loaiphong delete failed: " + err);
    errorHandler(err, res, req);
  }
};
