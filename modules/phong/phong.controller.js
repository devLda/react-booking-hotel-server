const Phong = require("./phong.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Phong(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Phong'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Phong.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Phong'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Phong.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Phong'})
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

      const result = await Phong.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Phong list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Phong'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Phong.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Phong'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Phong.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Phong delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Phong'})
  }
};
    
      