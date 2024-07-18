const  cartController= require("../controller/cartController")
const express= require("express")
const cartRoute= express()
cartRoute.post("/createCart",cartController.createCartController)
cartRoute.get("/getCart",cartController.getCartController)

module.exports=cartRoute