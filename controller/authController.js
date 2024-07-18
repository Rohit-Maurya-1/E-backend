const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.send({
        status: false,
        message: "all field require",
        response: {},
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.send({
        status: false,
        message: "email already exist",
        response: {},
      });
    }

    const hPassword = await hashPassword(password);
    const createUser = await userModel.create({
      name,
      email,
      password: hPassword,
      phone,
      address,
    });

    if (createUser) {
      return res.status(201).send({
        status: true,
        message: "user register successfully",
        response: createUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
//============login============================
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        status: false,
        message: "!invalid use or password",
        response: {},
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ 
        status: false,
        message: "invalid email or password",
        response: {},
      });
    }
    const hPassword = await comparePassword(password, user.password);
    if (!hPassword) {
      return res.status(401).send({
        status: false,
        message: "invalid email or password",
        response: {},
      });
    }
    const Token = jwt.sign({ id: user._id }, process.env.SECRET_kEY);
    if (Token) {
      const tokenData = await userModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { token: Token } },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        message: "login successfully",
        response: {
          _id:user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          token: tokenData.token,
          role: user.role,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.demo = (req, res) => {
  res.send("protected route");
};

module.exports.userAuth = (req, res) => {
  res.status(200).send({ ok: true });
};
module.exports.adminAuth = (req, res) => {
  res.status(200).send({ ok: true });
};
