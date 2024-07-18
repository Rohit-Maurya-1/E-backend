const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    // required: true,
  },
  product: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});
const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
