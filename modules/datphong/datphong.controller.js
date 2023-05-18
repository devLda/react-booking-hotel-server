const Datphong = require("./datphong.model");
const errorHandler = require("../../utils/errorHandler");
const asyncHandler = require("express-async-handler");

module.exports.create = asyncHandler(async (req, res) => {
  console.log("body ", req.body);
  console.log("params ", req.params);
  console.log("query ", req.query);
  return res.status(200).json({
    mes: "Ok",
  });
});

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Datphong.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong getAll failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Datphong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong getById failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
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

    const result = await Datphong.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong list failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Datphong.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong update failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Datphong.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Datphong delete failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "Datphong" });
  }
};
