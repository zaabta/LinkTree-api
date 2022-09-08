const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.post("/", middleware.isAuthenticated, controller.setLink)
router.get("/", middleware.isAuthenticated, controller.getLinks)
router.get("/:id", middleware.isAuthenticated, controller.getLink)
router.put("/:id", middleware.isAuthenticated, controller.editLink)
/*

router.put("/:id", middleware.isAuthenticated, controller.editLink)
router.delete("/:id", middleware.isAuthenticated, controller.deleteLink)

*/


module.exports = router