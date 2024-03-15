const express= require( "express");
const{isAdmin,verifyToken } =require("../middleware/authVerifyUserMiddleware");
const {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} =require("../controller/categoryController");

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  verifyToken,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  verifyToken,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  verifyToken,
  isAdmin,
  deleteCategoryCOntroller
);
module.exports=router
