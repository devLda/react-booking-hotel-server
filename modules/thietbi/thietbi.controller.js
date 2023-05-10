const Thietbi = require("./thietbi.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Thietbi(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thietbi'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Thietbi.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thietbi'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Thietbi.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thietbi'})
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

      const result = await Thietbi.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Thietbi list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Thietbi'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Thietbi.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thietbi'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Thietbi.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Thietbi delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Thietbi'})
  }
};
    
      