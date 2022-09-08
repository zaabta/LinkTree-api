const express = require("express")
const router = express.Router();

router.use("/users", require("../lib/users/routes"))
router.use("/subscribes", require("../lib/subscribes/routes"))
router.use("/links", require("../lib/links/routes"))
router.use("/linktypes", require("../lib/linkTypes/routes"))
router.use("/qr", require("../lib/qr/routes"))

module.exports = router;