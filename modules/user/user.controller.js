const User = require("./user.model");
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const data = req.body;
    data.GioiTinh = req.body.GioiTinh === "Male" ? true : false;
    data.NgaySinh = req.body.NgaySinh ? new Date(req.body.NgaySinh) : null;
    console.log("body data ", data);
    const item = new User(data);
    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await User.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getAll failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { Username } = req.params;
    console.log(Username)
    const result = await User.findOne({ Username: Username });

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getById failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
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

    const result = await User.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("User list failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { Username } = req.body;
    const data = req.body;
    data.GioiTinh = req.body.GioiTinh === "Male" ? true : false;
    data.NgaySinh = new Date(data.NgaySinh)
    const result = await User.findOneAndUpdate({ Username: Username }, data, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("User update failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { Username } = req.params;
    console.log(Username)

    const result = await User.deleteOne({ Username: Username });
    return res.status(200).json(result);
  } catch (err) {
    console.error("User delete failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};
