const Hoadon = require("./hoadon.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Hoadon(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Hoadon creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Hoadon'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Hoadon.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Hoadon getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Hoadon'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Hoadon.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Hoadon getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Hoadon'})
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

      const result = await Hoadon.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Hoadon list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Hoadon'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Hoadon.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Hoadon update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Hoadon'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Hoadon.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Hoadon delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Hoadon'})
  }
};
    
      