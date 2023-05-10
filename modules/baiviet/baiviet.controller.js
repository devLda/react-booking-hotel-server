const Baiviet = require("./baiviet.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Baiviet(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Baiviet creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Baiviet'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Baiviet.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Baiviet getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Baiviet'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Baiviet.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Baiviet getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Baiviet'})
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

      const result = await Baiviet.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Baiviet list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Baiviet'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Baiviet.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Baiviet update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Baiviet'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Baiviet.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Baiviet delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Baiviet'})
  }
};
    
      