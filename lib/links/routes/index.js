const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.post("/", middleware.isAuthenticated, controller.setLink)
router.get("/", middleware.isAuthenticated, controller.getLinks)


module.exports = router