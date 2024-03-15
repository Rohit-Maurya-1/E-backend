const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["auth"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_kEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user.role !== 1) {
      return res.status(401).send({
        status: false,
        message: "UnAuthrized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
