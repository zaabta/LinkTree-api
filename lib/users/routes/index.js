const express = require("express")
const router = express.Router()
const  controller  = require("../controller")
const multer = require("multer");
const upload = multer();
const middleware = require("../../middleware")



router.post("/signup", controller.createAccount)
router.post("/signin", controller.login)
router.post("/avatar", middleware.isAuthenticated, upload.single("file") , controller.upload)  
router.post("/bg", controller.login)


module.exports = router