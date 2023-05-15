const Thongtinkh = require("./thongtinkh.model");
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const { Email } = req.body;

    if (!Email)
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const KH = await Thongtinkh.findOne({ Email });

    if (KH) throw new Error("Khách hàng đã tồn tại");
    else {
      const newKH = await Thongtinkh.create(req.body);
      return res.status(200).json({
        success: newKH ? true : false,
        mes: newKH,
      });
    }
  } catch (err) {
    console.error("Thongtinkh creation failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Thongtinkh.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh getAll failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thongtinkh.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh getById failed: " + err);
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

    const result = await Thongtinkh.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh list failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thongtinkh.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh update failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Thongtinkh.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh delete failed: " + err);
    errorHandler(err, res, req);
  }
};
