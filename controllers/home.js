const Posts = require("../models/posts")
const Pages = require("../models/pages")


//Show Home Page
exports.show = (req, res, next) => {
    Posts.find({}, function(err, foundPosts){
        if(err){
            console.log(err)
        }else{
    Pages.find({}, function(err, foundPages){
        if(err){
            console.log(err);
        }else{
            console.log("here")
            return res.render("home", {pages: foundPages, posts: foundPosts})
        }
    })
        }
    })
    
}
