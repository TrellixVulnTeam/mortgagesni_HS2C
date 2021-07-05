const express = require('express')
const router = express.Router();
const calcController = require('../../controllers/calculators/calculators');


//Show the home pages for each section
router.get("/calculators", calcController.showParentalPage);

//Show Route for each section
router.get("/calculators/:id", calcController.showPageRoute);



module.exports = router;