const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")


router.post("/", middleware.isAuthenticated, middleware.isAdmin, controller.setLinkType)
router.get("/", middleware.isAuthenticated, controller.getLinkTypes)
router.delete("/:id", middleware.isAuthenticated, middleware.isAdmin, controller.deleteLinkType)



module.exports = router