const Dichvu = require("./dichvu.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Dichvu(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Dichvu creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Dichvu'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Dichvu.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Dichvu getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Dichvu'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Dichvu.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Dichvu getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Dichvu'})
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

      const result = await Dichvu.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Dichvu list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Dichvu'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Dichvu.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Dichvu update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Dichvu'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Dichvu.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Dichvu delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Dichvu'})
  }
};
    
      