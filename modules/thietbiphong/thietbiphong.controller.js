const Thietbiphong = require("./thietbiphong.model");
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const { IDThietBiPhong } = req.body;

    if (!IDThietBiPhong)
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const item = await Thietbiphong.findOne({ IDThietBiPhong });

    if (item) throw new Error("Thiết bị phòng đã tồn tại");
    else {
      const newTB = await Thietbiphong.create(req.body);
      return res.status(200).json({
        success: newTB ? true : false,
        mes: newTB,
      });
    }
  } catch (err) {
    console.error("Thietbiphong creation failed: " + err);
    errorHandler(err, res, req);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Thietbiphong.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbiphong getAll failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Thietbiphong" });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thietbiphong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbiphong getById failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Thietbiphong" });
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

    const result = await Thietbiphong.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbiphong list failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Thietbiphong" });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Thietbiphong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbiphong update failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Thietbiphong" });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Thietbiphong.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbiphong delete failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Thietbiphong" });
  }
};
