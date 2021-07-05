const express = require('express')
const router = express.Router();
const postController = require('../../controllers/posts/posts');
const isLoggedIn = require("../../middleware/isLoggedIn");



//example Route

//Get the create a new post route
router.get("/create-new-post", isLoggedIn, postController.getCreateNew)
//Post
router.post('/create-new-post', isLoggedIn, postController.postCreateNew);


//show the mortgage news home page  
router.get("/mortgage-news", postController.postHome);
//show the mortgage news home page  
router.get("/mortgage-advice", postController.postHome);

//show the mortgage news posts page 
router.get("/mortgage-news/:page", postController.postShow)
//show the mortgage advice posts page 
router.get("/mortgage-advice/:page", postController.postShow)

//edit

//delete


module.exports = router;