const Tang = require("./tang.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Tang(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Tang creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Tang'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Tang.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Tang getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Tang'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Tang.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Tang getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Tang'})
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

      const result = await Tang.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Tang list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Tang'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Tang.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Tang update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Tang'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Tang.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Tang delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Tang'})
  }
};
    
      