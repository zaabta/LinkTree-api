const express = require("express")
const router = express.Router()
const  controller  = require("../controller")


router.post("/signup", controller.createAccount)
router.post("/signin", controller.login)

module.exports = router