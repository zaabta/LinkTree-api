const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.get("/", middleware.isAuthenticated, controller.generateQR)
//router.get("/:link", controller.scanQR)


module.exports = router