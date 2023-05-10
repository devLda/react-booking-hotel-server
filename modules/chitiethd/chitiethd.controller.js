const Chitiethd = require("./chitiethd.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Chitiethd(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Chitiethd creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Chitiethd'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Chitiethd.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Chitiethd getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Chitiethd'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Chitiethd.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Chitiethd getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Chitiethd'})
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

      const result = await Chitiethd.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Chitiethd list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Chitiethd'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Chitiethd.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Chitiethd update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Chitiethd'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Chitiethd.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Chitiethd delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Chitiethd'})
  }
};
    
      