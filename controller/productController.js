const productModel = require("../models/productModel");
const categoryModel =require("../models/categoryModel")
const orderModel= require ("../models/OrderModel")
const dotenv= require ("dotenv")


// const braintree = require("braintree");
// dotenv.config();
//   const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.Merchant_ID,
//   publicKey: process.env.Public_Key,
//   privateKey: process.env.Private_Key,
// });
//==============================================================================================================================================//

module.exports.createProductController = async (req, res, next) => {
  try {
    const { name, slug, description, price, category, quantity, shipping, rating,numReviews } = req.body;
    const ProductName = await productModel.findOne({ name });
    if (ProductName) {
      return res.status(401).send({
        status: false,
        message: "ProductName Address Allready exist",
        response: {},
      });
    }
    const addBusinessData = await productModel.create({
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
      photo: req.file.filename,
      rating,
      numReviews
    });
    if (!addBusinessData) {
      return res.status(401).send({
        status: false,
        message: "not data",
        response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "add Product successfully",
      response: addBusinessData,
    });
  } catch (error) {
    next(error);
  }
};
//==================================get business details==================================
module.exports.getProductController = async (req, res, next) => {
  try {
    const getProducts = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    if (!getProducts) {
      return res.status(400).send({
        status: false,
        message: "not get data",
        response: {},
      });
    }
    res.status(200).send({
      status: true,
      total: getProducts.length,
      message: "get all data",
      response: getProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleProductController = async (req, res, next) => {
  try {
    const id = req.params._id;
    const getProducts = await productModel
      .find({ id })
      .populate("category")
      if (!getProducts) {
      return res.status(400).send({
        status: false,
        message: "not get data",
        response: {},
      });
    }
    res.status(200).send({
      status: true,
      total: getProducts.length,
      message: "get all data",
      response: getProducts,
    });
  } catch (error) {
    next(error);
  }
};
//===============================updateData======================================
module.exports.UpdateProductController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { name, slug, description, price, category, quantity, shipping, rating,numReviews } =  req.body;
    if (req.file) {
      var dataRecords = {
        name, description, price, category, quantity, shipping,
        photo: req.file.filename,
      };
    } else {
      var dataRecords = {
        name, description, price, category, quantity, shipping,
      };
    }
    const updateData = await productModel.findByIdAndUpdate(_id, dataRecords);
    if (!updateData) {
      return res.status(400).send({
        status: false,
        message: "user not update",
        Response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "user update successfully",
      Response: updateData,
    });
  } catch (error) {
    next(error);
  }
};
//==============================deleteBusinessuser====================================
module.exports.DeleteProductController = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const deleteData = await productModel.findByIdAndDelete(_id);
    if (!deleteData) {
      return res.status(400).send({
        status: false,
        message: "user not deleted",
        Response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "user deleted successfully",
      Response: deleteData,
    });
  } catch (error) {
    next(error);
  }
};

//filter
module.exports.productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
// product count
module.exports.productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

module.exports.productListController = async (req, res) => {
  try {
    const perPage = 7;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      // .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
// search product
module.exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel.find({
       $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      // .select("-photo");
      res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

//============================== get product by category=============
module.exports.ProductCategoryController = async (req, res) => {
  try {
    const id = req.params._id
    const category= await categoryModel.findOne({id})
    const products=await productModel.find({category}).populate("category")
      res.send({
      success:true,
      product:products
     })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
//===========================================get productPhoto===========================================
module.exports.productPhotoController = async (req, res) => {
    try {
      const id= req.params._id
      const product = await productModel.findOne(id).select("photo");
     if (product.uploads) {
        res.set("photo", product.photo);
        return res.status(200).send(product.uploads);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

   // ===========================similar products=============================================
 module.exports.realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel.find({category: cid,_id: { $ne: pid },})
      // .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};


module.exports.braintreeToken=(req,res)=>{
  try {
    gateway.clientToken.generate({} ,function(err, responce){
       if(err){
           res.status(500).send(err)
       }
       else{
        res.send(responce)
       }
    })
    
  } catch (error) {
     console.log(error);
  }

}


module.exports.brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
