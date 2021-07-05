const express = require('express')
const router = express.Router();
const pageController = require('../../controllers/pages/pages');
const isLoggedIn = require("../../middleware/isLoggedIn");
const Pages = require("../../models/pages");

//example Route

//Get the create a new page route
router.get("/create-new-page", isLoggedIn, pageController.pageGetCreateNew)

//create a new page route
router.post("/create-new-page", isLoggedIn, pageController.pagePostCreateNew);

//Show the home pages for each section
router.get("/first-time-buyer-mortgages", pageController.showParentalPages);
router.get("/buy-to-let-mortgages", pageController.showParentalPages);
router.get("/re-mortgage-advice", pageController.showParentalPages);
router.get("/self-build-mortgages", pageController.showParentalPages);
router.get("/self-employed-mortgages", pageController.showParentalPages);
router.get("/home-mover", pageController.showParentalPages);
// router.get("/:section", pageController.showParentalPages)

//Show Route for each section
router.get("/first-time-buyer-mortgages/:id", pageController.showPageRoute);
router.get("/buy-to-let-mortgages/:id", pageController.showPageRoute);
router.get("/re-mortgage-advice/:id", pageController.showPageRoute);
router.get("/self-build-mortgages/:id", pageController.showPageRoute);
router.get("/self-employed-mortgages/:id", pageController.showPageRoute);
router.get("/home-mover/:id", pageController.showPageRoute);
// router.get("/:section/:id", pageController.showPageRoute);



module.exports = router;