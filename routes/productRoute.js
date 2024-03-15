const  ProductController= require("../controller/productController")
 const express = require("express")
 const router= express();
 const upload= require("../middleware/fileUpload");
router.post("/create-product",upload.single("imageData"),ProductController.createProductController)
router.get("/get-Produts",ProductController.getProductController)
router.get("/get-Produts/:id",ProductController.getSingleProductController)
router.patch("/UpdateProductController/:id",upload.array("imageData",3),ProductController.UpdateProductController)
router.delete("/DeleteProductController/:id",ProductController.DeleteProductController)
router.post("/product-filters",ProductController.productFiltersController)
// //product count
router.get("/product-count",ProductController.productCountController);

// //product per page
router.get("/product-list/:page",ProductController.productListController);
router.get("/search/:keyword",ProductController.searchProductController);
router.get("/getProductByCate/:id",ProductController.ProductCategoryController);
router.get("/productPhotoController/:id",ProductController.productPhotoController);
// //similar product
router.get("/related-product/:pid/:cid", ProductController.realtedProductController);
// //payments routes
// //token
router.get("/braintree/token", ProductController.braintreeToken);

// //payments
router.post("/braintree/payment",ProductController.brainTreePaymentController);

module.exports=router

