const devController = require("../useCases/devManagement/devController");
const express = require("express");
const router = express.Router();

router.get("/", devController.index);
router.get("/:github", devController.show);
router.post("/", devController.store);

module.exports = router;
