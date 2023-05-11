const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyAccessToken = async (req, res, next) => {
  //Bearer token
  //headers: {authorization: Bearer token}
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "Invalid AccessToken",
        });
      // console.log(decode);
      req.User = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authentication!!!",
    });
  }
};

const verifyRefreshToken = (req, res, next) => {

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
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken
};
