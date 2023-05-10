const User = require("./user.model");
const errorHandler = require("../../utils/errorHandler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middleware/jwt");

module.exports.register = async (req, res) => {
  try {
    const { Username, Password, Email } = req.body;
    if (!(Username || Password || Email))
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const user = await User.findOne({ Email });
    if (user) throw new Error("Email đã tồn tại!");
    else {
      const newUser = await User.create(req.body);
      return res.status(200).json({
        success: newUser ? true : false,
        mes: newUser
          ? "Đăng ký thành công. Vui lòng đăng nhập"
          : "Đăng ký thất bại",
      });
    }
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

//Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền
module.exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!(Password || Email))
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });

    const response = await User.findOne({ Email });
    if (response && (await response.isCorrectPassword(Password))) {
      const { Password, Role, ...userData } = response.toObject();
      const accessToken = generateAccessToken(response._id, Role);
      const refreshToken = generateRefreshToken(response._id);
      //Luu refresh token
      await User.findByIdAndUpdate(
        response._id,
        { refreshToken },
        { new: true }
      );
      res.cookie("refreshToken ", refreshToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        accessToken,
        userData,
      });
    } else {
      throw new Error("Thông tin tài khoản hoặc mật khẩu không chính xác");
    }
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

module.exports.getCurrent = async (req, res) => {
  try {
    const { _id } = req.User;

    const user = await User.findById(_id).select(
      "-refreshToken -Password -Role"
    );
    return res.status(200).json({
      success: user ? true : false,
      mes: user ? user : "User not found",
    });
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};

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
    console.log(Username);
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
    data.NgaySinh = new Date(data.NgaySinh);
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
    console.log(Username);

    const result = await User.deleteOne({ Username: Username });
    return res.status(200).json(result);
  } catch (err) {
    console.error("User delete failed: " + err);
    const { status, message } = errorHandler(err);
    res.status(status).json({ message, entity: "User" });
  }
};
