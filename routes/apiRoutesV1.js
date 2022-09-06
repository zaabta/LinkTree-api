const express = require("express")
const router = express.Router();

router.use("/users", require("../lib/users/routes"))
router.use("/subscribes", require("../lib/subscribes/routes"))

module.exports = router;