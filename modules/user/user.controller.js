const User = require("./user.model");
const errorHandler = require("../../utils/errorHandler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middleware/jwt");
const sendMail = require('../../utils/sendMail')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
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
    // const { status, message } = errorHandler(err, res, req);
    errorHandler(err, res, req);
    // res.status(status).json({ message, entity: "User" });
  }
};

//Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền
const login = async (req, res) => {
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
    console.error("Đăng nhập thất bại: " + err);
    // const { status, message } = errorHandler(err, res, req);
    errorHandler(err, res, req);
    // res.status(status).json({ message, entity: "User" });
  }
};

const refreshAccessToken = async(req, res) => {
  try{
    //Lấy token từ cookies
  const cookie = req.cookies
  //Check xem có token hay không
  if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
  jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
    if(err) throw new Error('Invalid refresh token')
    //Check xem token có khớp với token đã lưu trong db
    const response = await User.findOne({_id: decode._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response ? generateAccessToken(response._id, response.Role) : "refresh token not matched"
    })
  }) 
  }
  catch (err) {
    console.error("RefreshToken thất bại: " + err);
    // const { status, message } = errorHandler(err, res, req);
    errorHandler(err, res, req);
    // res.status(status).json({ message, entity: "User" });
  }
}

const logout = async (req, res) => {
  try{
    const cookie = req.cookies
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    //Xóa refresh token ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new : true})
    //Xoa refresh token o cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })
    return res.status(200).json({
      success: true,
      mes: 'Logout is done'
    })
  }
  catch (err) {
    console.error("Đăng xuất thất bại: " + err);
    // const { status, message } = errorHandler(err, res, req);
    errorHandler(err, res, req);
    // res.status(status).json({ message, entity: "User" });
  }
}

const forgotPassword = async(req, res) => {
  
  try{
    const {Email} = req.query;
    console.log(Email)
    if(!Email) throw Error('Missing email!')
    const user = await User.findOne({Email})
    if(!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()
  
    const html = `<p style="font-size: 16px;">Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. 
    Link này sẽ hết hạn sau 15 phút kể từ bây giờ.
    <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>
    </p>`
   
    const data = {
      Email,
      html
    }
  
    const rs = await sendMail(data)
    return res.status(200).json({
      success: true,
      rs
    })
    
  }
  catch (err) {
    console.error("ForgotPassword thất bại: " + err);
    // const { status, message } = errorHandler(err, res, req);
    errorHandler(err, res, req);
    // res.status(status).json({ message, entity: "User" });
  }
}

const resetPassword = async (req, res) => {
  
  try{
    const {Password, Token} = req.body
  
    if(!(Password || Token)) throw new Error('Missing Inputs')
  
    const passwordResetToken = crypto.createHash('sha256').update(Token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt : Date.now()}})
    if(!user) throw new Error('Invalid reset token')
    user.Password = Password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now() 
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
      success: user ? true : false,
      mes: user ? 'Update password' : 'Something went wrong'
    })
  }
  catch (err) {
    console.error("Resetpassword thất bại " + err);
    errorHandler(err, res, req);
  }
}

const getCurrent = async (req, res) => {
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
    console.error("Lấy user thất bại: " + err);
    // const { status, message } = errorHandler(err, res, req);
    errorHandler(err, res, req);
    // res.status(status).json({ message, entity: "User" });
  }
};

const create = async (req, res) => {
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
    // const { status, message } = errorHandler(err);
    errorHandler(err);
    // res.status(status).json({ message, entity: "User" });
  }
};

const getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await User.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getAll failed: " + err);
    // const { status, message } = errorHandler(err);
    errorHandler(err);
    // res.status(status).json({ message, entity: "User" });
  }
};

const getById = async (req, res) => {
  try {
    const { Username } = req.params;
    console.log(Username);
    const result = await User.findOne({ Username: Username });

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getById failed: " + err);
    // const { status, message } = errorHandler(err);
    errorHandler(err);
    // res.status(status).json({ message, entity: "User" });
  }
};

const getList = async (req, res) => {
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
    // const { status, message } = errorHandler(err);
    errorHandler(err);
    // res.status(status).json({ message, entity: "User" });
  }
};

const update = async (req, res) => {
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
    // const { status, message } = errorHandler(err);
    errorHandler(err);
    // res.status(status).json({ message, entity: "User" });
  }
};

const remove = async (req, res) => {
  try {
    const { Username } = req.params;
    console.log(Username);

    const result = await User.deleteOne({ Username: Username });
    return res.status(200).json(result);
  } catch (err) {
    console.error("User delete failed: " + err);
    // const { status, message } = errorHandler(err);
    errorHandler(err);
    // res.status(status).json({ message, entity: "User" });
  }
};

module.exports = {
register,
login,
refreshAccessToken,
logout,
forgotPassword,
resetPassword,
getCurrent,
create,
getAll,
getById,
getList,
update,
remove,
}