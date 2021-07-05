const express = require('express')
const router = express.Router();
const sourcingController = require('../../controllers/sourcing/lifeSourcing');


//Get the create a new post route
router.get("/best-life-insurance-deals-ni", sourcingController.getProducts)

router.post("/update-sourcing-products", sourcingController.updateProducts)



module.exports = router;