const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyAccessToken = async (req, res, next) => {
  try {
    //Bearer token
    //headers: {authorization: Bearer token}
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err)
          return res.status(401).json({
            success: false,
            mes: "AccessToken không hợp lệ",
          });
        req.User = decode;
        next();
      });
    } else {
      return res.status(401).json({
        success: false,
        mes: "Yêu cầu xác thực!!!",
      });
    }
  } catch (err) {
    errorHandler(err, res, req);
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    if (req?.headers?.cookie?.startsWith("refreshToken")) {
      const token = req.headers.cookie.replace("refreshToken=", "");

      if (!token) {
        return res.status(403).send({ message: "No token provided!" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return catchError(err, res);
        }
        req._id = decoded._id;
        next();
      });
    }
  } catch (err) {
    errorHandler(err, res, req);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.User;
    if (role !== "admin")
      return res.status(401).json({
        success: false,
        mes: "Yêu cầu quyền admin",
      });
    next();
  } catch (err) {
    errorHandler(err, res, req);
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  isAdmin,
};
