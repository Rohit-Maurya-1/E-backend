const express= require("express")
const {verifyToken,isAdmin}= require("../middleware/authVerifyUserMiddleware")
const registerController= require("../controller/authController")
const router= express()


router.post("/register",registerController.register)
router.post("/login",registerController.login)
router.get("/demo",verifyToken,isAdmin,registerController.demo)
router.get("/userAuth",verifyToken,registerController.userAuth)
router.get("/adminAuth",verifyToken,isAdmin,registerController.adminAuth)


module.exports=router