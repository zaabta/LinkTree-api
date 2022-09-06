const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/", controller.subscribe);
router.get("/", controller.getSubscribers);

module.exports = router;
