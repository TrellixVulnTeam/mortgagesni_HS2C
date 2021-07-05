//Import any required schemas 
const Post = require("../../models/posts")

//Create a new post

//Get the create new post route
exports.getCreateNew = (req, res, next) => {
    res.render("posts/create-new-post")
}

//Post to the create new Post route
exports.postCreateNew = (req, res, next) => {

    Post.create(req.body, function(err, newPost){
        if(err){
          console.log("Error")
        }else{
          newPost.save();
          res.redirect("/create-new-post");
        }
      })
}

//Show the home page for a post
exports.postHome =(req, res, next) => {
  
  Post.find({}, function(err, foundPosts){
    if(err){
      console.log(err)
    }else{
      const url = req.originalUrl;
      console.log(url)
      res.render("posts/home", {posts: foundPosts, url: url})
     // res.render(`${url}/${url}`, {posts: foundPosts, url: url})
    }
  })


}

//Show a show page for a post section
exports.postShow = (req,res,next) => {

  const category = req.params.cat;
  let requestedPage = req.params.page;

  Post.find({}, function(err, foundPosts){
    if(err){
      console.log(err);
    }else{
      res.render(`posts/show`, 
      {posts: foundPosts, 
        requestedPage: requestedPage,
        category: category
      })
    }
  })
}