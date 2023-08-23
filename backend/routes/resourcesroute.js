const resources = require("./../controllers/resourcescontroller");
const authentication = require("./../controllers/authstudent");
const express = require("express");
const router = express.Router();
router
  .route("/resources")
  .get(resources.getresources)
  .post(resources.createresources);
//authentication.protect,
module.exports = router;
