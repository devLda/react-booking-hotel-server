const Thongtinkh = require("./thongtinkh.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Thongtinkh(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thongtinkh'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Thongtinkh.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thongtinkh'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Thongtinkh.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thongtinkh'})
  }
};
    
      
module.exports.getList = async(req, res) => {
    try {
      const { page = 1, limit = 20, sortField, sortOrder } = req.query;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {}

      };

      if (sortField && sortOrder) {
        options.sort = {
            [sortField]: sortOrder
        }
      }

      const result = await Thongtinkh.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Thongtinkh list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Thongtinkh'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Thongtinkh.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thongtinkh'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Thongtinkh.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thongtinkh delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thongtinkh'})
  }
};
    
      