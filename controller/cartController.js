const CartModel = require("../models/cartModel");
const Product = require("../models/productModel");

module.exports.createCartController = async (req, res, next) => {
  const { user, product } = req.body;
  try {
  
    if (!product) {
      return res.status(401).send({ message: "Product is required !" });
    }
    const cartData = await CartModel.create({
      user,
      product,
    });
    if (cartData) {
      return res.status(200).send({
        message: "cart add successfully",
        response: cartData,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getCartController = async (req, res, next) => {
  try {
    const getCart = await CartModel.find()
    .populate([
      {path: "user"},
      {path:"product",
      populate:[
        {path:"category"}
      ]
    },]);
    if (getCart) {
      res.status(200).send({
        message: "all cart get",
        response: getCart,
      });
    }
  } catch (error) {
    next(error);
  }
};
