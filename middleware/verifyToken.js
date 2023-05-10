const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  //Bearer token
  //headers: {authorization: Bearer token}
  console.log("zo");
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

module.exports = {
  verifyAccessToken,
};
