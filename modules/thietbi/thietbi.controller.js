const Thietbi = require("./thietbi.model");
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const { IDThietBi, TenThietBi } = req.body;

    if (!IDThietBi || !TenThietBi)
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const item = await Thietbi.findOne({ IDThietBi });

    if (item) throw new Error("Thiết bị đã tồn tại");
    else {
      const newThietBi = await Thietbi.create(req.body);
      return res.status(200).json({
        success: newThietBi ? true : false,
        mes: newThietBi,
      });
    }
  } catch (err) {
    console.error("ThietBi creation failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Thietbi.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thietbi.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi getById failed: " + err);
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

    const result = await Thietbi.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi list failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thietbi.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi update failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Thietbi.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi delete failed: " + err);
    errorHandler(err, res, req);
  }
};
